import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import rjson from '@rollup/plugin-json';
let tsconfigOverride = {
  compilerOptions: {
    target: 'ES6',
    lib: ['ES2020', 'dom'],
    rootDir: 'src/datepicker',
    declarationDir: "dist/types"
  },
  include: ['src/**/*'],
}

export default [
  {
    output: {
      format: 'esm',
      file: 'dist/vue3-datepicker.esm.js',
    },
    plugins: [
      typescript({ tsconfigOverride, useTsconfigDeclarationDir: true }),
      vue(),
      nodeResolve(),
      commonjs(),
      rjson(),
      postcss({
        plugins: [],
      }),
    ],
  },
  {
    output: {
      format: 'cjs',
      file: 'dist/vue3-datepicker.cjs.js',
      exports: 'default',
    },
    plugins: [
      typescript({ tsconfigOverride, useTsconfigDeclarationDir: true }),
      vue({ css: false }),
      postcss({
        extract: path.resolve('dist', 'vue3-datepicker.css'),
        inject: false,
        plugins: [],
      }),
    ],
  },
].map((v) => ({
  ...v,
  input: 'src/datepicker/Datepicker.vue',
  external: ['vue', 'date-fns', 'date-fns/fp', 'date-fns/locale'],
}))
