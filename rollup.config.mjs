import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.mjs',
      format: 'es',
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
  ],
  plugins: [typescript(), terser(), nodeResolve({ browser: true })],
};
