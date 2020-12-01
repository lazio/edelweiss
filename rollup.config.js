import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: {
    file: 'build/index.js',
    format: 'es',
  },
  plugins: [typescript(), terser()],
  external: ['@fluss/core', '@fluss/web'],
};
