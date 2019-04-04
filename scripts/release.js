#!/usr/bin/env node

import packageJson from '../package.json';
import conventionalRecommendedBump from 'conventional-recommended-bump';
import semver from 'semver';
import pify from 'pify';
import { rollup, watch } from 'rollup';
import rollupConfig from './rollup.config';
import Listr from 'listr';
import spawn from 'cross-spawn';
import filter from 'lodash/filter';
import standardVersion from 'standard-version';
import inquirer from 'inquirer';

export default class Release {
  constructor() {
    this.currentVersion = packageJson.version;
    this.newVersion = null;

    this.tasks = new Listr([
      {
        title: 'Build new version with rollup',
        task: this.build
      },
      {
        title: `Fetching changed files from 'dist' folder and commiting them`,
        task: this.commitChangedFiles.bind(this)
      },
      {
        title: `Make new release with standard version`,
        task: this.release.bind(this)
      }
    ]);
  }

  async run() {
    this.newVersion = await this.getNextVersion();

    const { release } = await inquirer.prompt([
      {
        type: 'confirm',
        message: 'You are about to release a new version, are you sure?',
        name: 'release'
      }
    ]);

    if (release) this.tasks.run();
  }

  async build(_watch = false) {
    try {
      const bundles = [];
      for (const config of rollupConfig) {
        bundles.push({
          [_watch ? 'bundleWatcher' : 'bundle']: _watch ? await watch(config) : await rollup(config),
          output: config.output
        });
      }

      if (_watch) {
        for (const { bundleWatcher, output } of bundles) {
          // There is no need for building min files in development
          if (!output.file.includes('min')) {
            bundleWatcher.on('event', event => {
              switch (event.code) {
              case 'START':
                return console.log(`Watching for changes`);
  
              case 'BUNDLE_START':
                return console.log(`Building bundle`);
  
              case 'BUNDLE_END':
                return;
  
              case 'END':
                return console.log(`Bundle built`);
  
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

  commitChangedFiles() {
    const { stdout, stderr } = this.exec('git', 'diff', '--name-only');
    if (stderr) throw new Error(stderr);

    const files = filter(stdout.split('\n'), file => file.match(/dist/g));

    const { stderr: stderrAdd } = this.exec('git', 'add', ...files);
    if (stderrAdd) throw new Error(stderrAdd);

    const { stderrCommit } = this.exec('git', 'commit', `-m"fix: Adding newly built files for version ${this.newVersion}"`);
    if (stderrCommit) throw new Error(stderrCommit);
  }

  async release() {
    await standardVersion({
      infile: 'CHANGELOG.md',
      silent: true
    });
  }

  exec(command, ...args) {
    const r = spawn.sync(command, args);
    const composedCommand = command + ' ' + [ ...args ].join(' ');

    return {
      stdout: String(r.stdout).trim(),
      stderr: String(r.stderr).trim(),
      composedCommand
    };
  }
}
