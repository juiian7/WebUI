// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import process from "process";

const dev = process.env.BUILD === "development";

export default [
    {
        input: "src/index.ts",
        output: {
            dir: "dist",
            format: "es",
            sourcemap: dev,
        },
        plugins: [typescript({ tsconfig: "./tsconfig.json" })],
    },
    {
        input: "dist/dts/index.d.ts",
        output: {
            file: "dist/index.d.ts",
            format: "es",
            sourcemap: dev,
        },
        plugins: [dts()],
    },
];
