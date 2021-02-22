import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/lodash.ts',
  output: {
    file: 'build/src/lodash.js',
    format: 'cjs',
    compact: true,
  },
  plugins: [nodeResolve(), commonjs(), terser()],
}
