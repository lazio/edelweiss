import flow from 'rollup-plugin-flow'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.mjs',
  output: [
    {
      file: 'dist/index.mjs',
      format: 'es',
      plugins: [terser()],
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      plugins: [terser()],
    },
  ],
  plugins: [flow()],
}
