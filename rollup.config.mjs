import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'build/index.mjs',
      format: 'es',
    },
    {
      file: 'build/index.js',
      format: 'cjs',
    },
  ],
  plugins: [typescript(), terser(), nodeResolve({ browser: true })],
};
