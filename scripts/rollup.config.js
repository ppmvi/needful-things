import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';
import defaultsDeep from 'lodash/defaultsDeep';
import fs from 'fs';
import builtins from './builtins';

export default class RollupConfig {
  constructor(options = {}) {
    this.pkg = JSON.parse(fs.readFileSync('./package.json'));
    this.options = defaultsDeep({}, options, {
      minify: false,
      name: 'needful-things',
      input: './src/index.js',
      external: []
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
    let min = '';

    if (this.options.minify) min = `.min`;

    return {
      format: 'esm',
      preferConst: true,
      file: `dist/${this.options.name}${min}.js`
    };
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

    plugins.push(commonjs());

    plugins.push(
      vue({
        compileTemplate: true
      })
    );

    plugins.push(
      babel({
        runtimeHelpers: true,
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
        babelrc: false,
        presets: [
          ['@babel/preset-env', { modules: false }]
        ],
        plugins: [
          '@babel/plugin-transform-runtime'
        ]
      })
    );

    if (this.options.minify) plugins.push(terser());

    plugins.push(
      license({
        banner: [
          '/*!',
          ` * Needful things v${this.pkg.version}`,
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
