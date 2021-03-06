import fs from 'fs';
import path from 'path';
import tinify from 'tinify';
import pify from 'pify';
import ora from 'ora';
import glob from 'glob';
import logSymbols from 'log-symbols';
import chalk from 'chalk';
import File from './file';
import { Separator, prompt, CheckboxChoiceOptions } from 'inquirer';
import { default as ISeparator } from 'inquirer/lib/objects/separator';

interface Options extends CheckboxChoiceOptions {
  disabled: boolean | string;
}

interface PpmviConfig {
  favicons?: object;
  tinify?: {
    key?: string;
  };
}

class Tinify extends File {
  private compressionsThisMonth: number | undefined;
  private config: PpmviConfig = {};

  constructor() {
    super();
    this.getConfig();
  }

  async run() {
    try {
      await this.setCompressionCount();

      const choices = await this.getFiles();

      const count = choices.filter(
        (file) => !(file instanceof Separator) && !file.disabled
      ).length;

      if (count > 0) {
        const { selectedFiles } = await prompt([
          {
            type: 'checkbox',
            message: 'Select the files which should be compressed.',
            name: 'selectedFiles',
            pageSize: choices.length,
            choices,
            validate: (answer) => {
              if (answer.length < 1) {
                return 'You must at least choose one image.';
              }

              return true;
            },
          },
        ]);

        const { compress, addCompressFlag } = await prompt([
          {
            type: 'confirm',
            message: `You are about to compress the selected images. Do you want to continue?`,
            name: 'compress',
            default: true,
          },
          {
            type: 'confirm',
            message: `Do you want to add a compressed flag to the file name? eg. test_compressed.png`,
            name: 'addCompressFlag',
            default: false,
            when: ({ compress }) => compress,
          },
        ]);

        if (compress) await this.doCompression(selectedFiles, addCompressFlag);
      } else {
        console.log(
          logSymbols.info,
          chalk.bold(`You already compressed all images.`)
        );
      }
    } catch (err) {
      console.log(err);
      console.log(
        logSymbols.error,
        chalk.bold(`Looks like your key is not valid.`)
      );
    }
  }

  async doCompression(selectedFiles = [], addCompressFlag = false) {
    for (const file of selectedFiles) {
      const filePath = process.cwd() + file;
      const dir = path.dirname(filePath);
      const ext = path.extname(filePath);
      const name = path.basename(filePath).replace(ext, '');
      const compressFlag = addCompressFlag ? '_compressed' : '';
      const fileBuffer = fs.readFileSync(filePath);
      const spinner = ora(`Compressing ${name}${ext}`).start();
      let result;

      try {
        result = await new Promise<Uint8Array>((resolve, reject) => {
          tinify.fromBuffer(fileBuffer).toBuffer((err, result) => {
            if (err) reject(err);
            resolve(result);
          });
        });
      } catch (err) {
        spinner.fail(err.message);
        break;
      }

      fs.writeFileSync(
        `${dir}/${name}${compressFlag}${ext}`,
        this.addUserComment(result.toString(), filePath)
      );
      spinner.succeed();
    }
  }

  async getFiles(): Promise<Array<Options | ISeparator>> {
    const files = (await pify(glob)(
      process.cwd() + '/src/**/*.{png,jpg,jpeg}',
      {}
    )) as string[];
    let curPath = '';

    return files.reduce((result: Array<Options | ISeparator>, value, key) => {
      const name = value.replace(process.cwd(), '');

      if (!curPath) curPath = path.dirname(name);
      else if (curPath && curPath !== path.dirname(name)) {
        result.push(new Separator('----------'));
        curPath = path.dirname(name);
      }

      result.push({
        name,
        checked: true,
        disabled:
          name.match(/compressed/) ||
          this.readUserComment(value).includes(File.EXIF_USER_COMMENT)
            ? 'Already compressed'
            : false,
      });
      return result;
    }, []);
  }

  async setCompressionCount() {
    try {
      await new Promise((resolve, reject) => {
        tinify.validate((err) => {
          if (err) reject(err);
          resolve();
        });
      });
      this.compressionsThisMonth = tinify.compressionCount;

      if (typeof this.compressionsThisMonth === 'undefined') {
        console.log(
          logSymbols.info,
          chalk.bold(
            `Couldnt get the compressions count. You probably havent done any compressions.`
          )
        );
      } else {
        console.log(
          logSymbols.info,
          chalk.bold(
            `You already used ${this.compressionsThisMonth}/500 free compressions this month.`
          )
        );
      }
    } catch (err) {
      throw err;
    }
  }

  getConfig() {
    const filePath = path.resolve(process.cwd(), './.ppmvi.js');
    let config = {
      tinify: { key: '' },
    };
    let userConfig = {};
    if (fs.existsSync(filePath)) userConfig = require(filePath).default;

    this.config = {
      ...config,
      ...userConfig,
    };
  }
}

export default async function tinifyImages() {
  const tinifyClass = new Tinify();
  await tinifyClass.run();
}
