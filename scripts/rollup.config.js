import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import license from 'rollup-plugin-license';
import defaultsDeep from 'lodash/defaultsDeep';
import typescript from 'rollup-plugin-typescript2';
import fs from 'fs';
import builtins from './builtins';

export default class RollupConfig {
  constructor(options = {}) {
    this.formats = ['cjs', 'esm'];
    this.pkg = JSON.parse(fs.readFileSync('./package.json'));
    this.options = defaultsDeep({}, options, {
      version: this.pkg.version,
      name: 'needful-things',
      input: './src/index.ts',
      external: ['vue']
    });
  }

  external() {
    const external = [
      ...builtins,
      ...Object.keys(this.pkg.dependencies),
      ...this.options.external
    ];

    return id => {
      const pattern = new RegExp(`^(${external.join('|')})($|/)`);
      return pattern.test(id);
    };
  }

  output() {
    return this.formats.map(format => ({
      file: `dist/${this.options.name}/${format}/index.js`,
      format,
      name: this.options.name,
      sourcemap: true,
      exports: 'named'
    }));
  }

  plugins() {
    const plugins = [];

    plugins.push(
      resolve({
        only: [
          'lodash'
        ]
      })
    );

    plugins.push(
      typescript({
        useTsconfigDeclarationDir: true
      })
    );

    plugins.push(
      vue({
        compileTemplate: true
      })
    );

    plugins.push(
      license({
        banner: [
          '/*!',
          ` * Needful things v${this.options.version}`,
          ` * Copyright <%= moment().format('YYYY') %> Florian Weber - ppm visuals & internet GmbH`,
          ` * Released under the MIT License.`,
          '*/'
        ].join('\n')
      })
    );

    return plugins;
  }

  config() {
    return {
      input: this.options.input,
      output: this.output(),
      external: this.external(),
      plugins: this.plugins()
    };
  }
}
