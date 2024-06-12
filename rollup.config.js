import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const config = {
    input: 'src/index.js',
    output: [
        {
            file: 'lib/index.esm.js', // package.json 中 "module": "lib/index.esm.js"
            format: 'esm', // es module 形式的包， 用来import 导入， 可以tree shaking
            sourcemap: false
        }, {
            file: 'lib/index.cjs.js', // package.json 中 "main": "dist/index.cjs.js",
            format: 'cjs', // commonjs 形式的包， require 导入
            sourcemap: false
        }, {
            file: 'lib/index.umd.js',
            name: 'umd',
            format: 'umd', // umd 兼容形式的包， 可以直接应用于网页 script
            sourcemap: false
        }
    ],
    plugins: [
        nodeResolve({
            extensions: ['.js']
        }),
        commonjs(),
        terser()]
};

export default config;
