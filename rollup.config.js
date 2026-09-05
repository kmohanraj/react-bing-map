import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "node:fs";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from "rollup-plugin-postcss";

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8')
);

const basePlugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  postcss({
    extensions: ['.css', '.scss'],
    plugins: []
  }),
];

export default [
  {
    input: "src/index.ts",
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      ...basePlugins,
      typescript({
        tsconfig: "./tsconfig.json",
        compilerOptions: {
          declaration: false,
        },
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      ...basePlugins,
      typescript({
        tsconfig: "./tsconfig.json",
        compilerOptions: {
          declaration: true,
          declarationDir: "./lib/esm",
        },
      }),
    ],
  },
];