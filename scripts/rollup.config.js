import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

const plugins = [
  resolve(),
  commonjs(),
  vue({
    compileTemplate: true
  }),
  babel({
    runtimeHelpers: true,
    extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
    babelrc: false,
    presets: [['@babel/preset-env', { modules: false }]]
  })
];
const minPlugins = [
  ...plugins,
  terser()
];

const esm = {
  input: './src/index.js',
  output: {
    format: 'esm',
    file: 'dist/needful-things.js'
  },
  external: [
    'fs',
    'path',
    'ora',
    'rfg-api'
  ],
  plugins
};

const esmMin = JSON.parse(JSON.stringify(esm));
esmMin.output.file = './dist/needful-things.min.js';
esmMin.plugins = minPlugins;

export default [
  esm,
  esmMin
];
