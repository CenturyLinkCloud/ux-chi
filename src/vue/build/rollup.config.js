import commonjs from 'rollup-plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const { prod } = process.env;

export default {
  input: 'src/build/component-library.ts', // Path relative to package.json
  output: {
    name: 'cv',
    exports: 'named',
    sourcemap: !prod,
    compact: prod,
    plugins: [...(prod ? [terser()] : [])]
  },
  watch: {
    chokidar: {
      usePolling: true,
      paths: 'src/**'
    },
    exclude: 'node_modules/**'
  },
  plugins: [
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    resolve(),
    typescript(),
    vue({
      css: true, // Dynamically inject css as a <style> tag
      compileTemplate: true, // Explicitly convert template to render function
    }),
    buble(), // Transpile to ES5
  ],
};
