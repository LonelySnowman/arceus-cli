import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import externals from "rollup-plugin-node-externals";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default defineConfig([
    {
        input: {
            index: 'src/index.ts',
        },
        output: [
            {
                dir: 'dist',
                entryFileNames: '[name].cjs',
                format: 'cjs',
            }
        ],
        plugins: [
            nodeResolve(),
            externals({
                devDeps: false,
            }),
            typescript(),
            commonjs(),
            terser(),
        ],
    },
]);