#!/usr/bin/env node

import packageJson from '../package.json';
import conventionalRecommendedBump from 'conventional-recommended-bump';
import semver from 'semver';
import pify from 'pify';
import { rollup, watch } from 'rollup';
import RollupConfig from './rollup.config';
import Listr from 'listr';
import execa from 'execa';
import filter from 'lodash/filter';
import standardVersion from 'standard-version';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import logSymbols from 'log-symbols';

export default class Release {
  constructor() {
    this.currentVersion = packageJson.version;
    this.newVersion = null;

    this.tasks = new Listr([
      {
        title: 'Build new version with rollup',
        task: async() => {
          await this.build(false);
        }
      },
      {
        title: `Fetching changed files from 'dist' folder and commiting them`,
        task: async() => {
          await this.commitChangedFiles();
        }
      },
      {
        title: `Make new release with standard version`,
        task: this.release.bind(this)
      }
    ]);
  }

  async run() {
    this.newVersion = await this.getNextVersion();
    const gitBranch = await this.gitBranch();

    const { release } = await inquirer.prompt([
      {
        type: 'confirm',
        message: 'You are about to release a new version, are you sure?',
        name: 'release'
      }
    ]);

    if (release) {
      const { branch } = await inquirer.prompt([
        {
          type: 'confirm',
          message: `You are currently in the '${gitBranch}' branch. Do you want to proceed?`,
          name: 'branch'
        }
      ]);

      if (branch) {
        await this.tasks.run();

        console.log(
          logSymbols.success,
          chalk.bold(
            `Finished preparing for new release. If you are happy with everything, merge the 'release/${this.newVersion}' branch into master.`
          )
        );
    
        const { revert } = await inquirer.prompt([
          {
            type: 'confirm',
            message: `Or do you want to revert this release?`,
            name: 'revert',
            default: false
          }
        ]);

        if (revert) {
          const revertTasks = new Listr([
            {
              title: 'Checkout master branch',
              task: async() => {
                await this.exec('git', 'checkout', 'master');
              }
            },
            {
              title: `Deleting branch 'release/${this.newVersion}'`,
              task: async() => {
                await this.exec('git', 'branch', '-D', `release/${this.newVersion}`);
              }
            },
            {
              title: `Deleting tag 'v${this.newVersion}'`,
              task: async() => {
                await this.exec('git', 'tag', '-d', `v${this.newVersion}`);
              }
            }
          ]);

          revertTasks.run();
        }
      }
    }
  }

  async build(_watch = false) {
    const bundles = [];
    const conifgs = [
      new RollupConfig().config(),
      new RollupConfig({ minify: true }).config(),
      new RollupConfig({
        name: 'cli-needful-things',
        input: './src/cli/index.js'
      }).config(),
      new RollupConfig({
        minify: true,
        name: 'cli-needful-things',
        input: './src/cli/index.js'
      }).config()
    ];

    try {
      for (const config of conifgs) {
        bundles.push({
          bundle: _watch ? await watch(config) : await rollup(config),
          output: config.output
        });
      }

      if (_watch) {
        const watcherSpinner = ora('Starting watching').start();

        for (const { bundle, output } of bundles) {
          // There is no need for building min files in development
          if (!output.file.includes('min')) {
            bundle.on('event', event => {
              switch (event.code) {
              case 'START':
                watcherSpinner.start();
                watcherSpinner.text = `Watching for changes`;
                break;
  
              case 'BUNDLE_START':
                console.clear();
                watcherSpinner.text = `Building bundle`;
                break;
  
              case 'BUNDLE_END':
                watcherSpinner.succeed(`Bundle built`);
                break;
  
              case 'END':
                break;
  
              case 'ERROR':
                return console.log(event.error);
  
              case 'FATAL':
                return console.log(event.error);
  
              default:
                return console.log(JSON.stringify(event));
              }
            });
          }
        }
      } else {
        for (const { bundle, output } of bundles) {
          await bundle.write(output);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getNextVersion() {
    try {
      const { releaseType } = await pify(conventionalRecommendedBump)({
        preset: 'angular'
      });
  
      return semver.valid(releaseType) || semver.inc(this.currentVersion, releaseType);
    } catch (err) {
      throw err;
    }
  }

  async commitChangedFiles() {
    const { stdout, stderr } = await this.exec('git', 'status', '--porcelain');
    if (stderr) throw new Error(stderr);

    const files = filter(stdout.split('\n'), file => file.match(/dist/g)).map(file => file.substring(2, file.length).trim());

    const gitBranch = await this.gitBranch();
    await this.exec('git', 'checkout', '-b', `release/${this.newVersion}`, gitBranch);

    if (files.length > 0) {
      const { stderr: stderrAdd } = await this.exec('git', 'add', ...files);
      if (stderrAdd) throw new Error(stderrAdd);
  
      const { stderrCommit } = await this.exec('git', 'commit', '-m', 'chore: pre release sync');
      if (stderrCommit) throw new Error(stderrCommit);
    }
  }

  async release() {
    await standardVersion({
      infile: 'CHANGELOG.md',
      silent: true
    });
  }

  async exec(command, ...args) {
    try {
      const {
        stdout: _stdout,
        stderr: _stderr,
        cmd: composedCommand
      } = await execa(command, args);
  
      return {
        stdout: String(_stdout).trim(),
        stderr: String(_stderr).trim(),
        composedCommand
      };
    } catch (err) {
      console.error(err);
    }
  }

  async gitBranch() {
    const { stdout } = await this.exec('git', 'rev-parse', '--abbrev-ref', 'HEAD');
    return stdout;
  }
}
