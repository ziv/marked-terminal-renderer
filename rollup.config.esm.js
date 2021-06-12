import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'lib/index.mjs',
    format: 'esm'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json()
  ]
};
