#!/usr/bin/env node

import packageJson from '../package.json';
import conventionalRecommendedBump from 'conventional-recommended-bump';
import semver from 'semver';
import pify from 'pify';
import { rollup } from 'rollup';
import rollupConfig from './rollup.config';
import Listr from 'listr';
import spawn from 'cross-spawn';
import filter from 'lodash/filter';
import standardVersion from 'standard-version';

class Release {
  constructor() {
    this.currentVersion = packageJson.version;
    this.newVersion = null;

    this.tasks = new Listr([
      {
        title: 'Fetch new Version',
        task: async(ctx, task) => {
          this.newVersion = await this.getNextVersion();
          task.title = `New version is ${this.newVersion}`;
        }
      },
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

  run() {
    this.tasks.run();
  }

  async build() {
    try {
      for (const config of rollupConfig) {
        const bundle = await rollup(config);
        await bundle.write(config.output);
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
      dryRun: true,
      infile: '../CHANGELOG.md',
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

const release = new Release();
release.run();
