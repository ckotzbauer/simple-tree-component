import typescript from "@rollup/plugin-typescript";

import { resolve } from "path";
import * as pkg from "../package.json";
import { RollupOptions } from "rollup";

export const getConfig = (opts?: { dev: boolean }): RollupOptions => ({
    input: "./src/index.ts",
    output: {
        file: "dist/simple-tree-component.js",
        name: "simple-tree-component",
        format: "umd",
        exports: "default",
        banner: `/* simple-tree-component v${pkg.version}, @license MIT */`,
        ...(opts && opts.dev ? { sourcemap: true } : {}),
    },
    experimentalOptimizeChunks: true,
    /*onwarn(warning) {
        const ignoredCircular = ["src/types/options.ts", "src/utils/dates.ts"];

        if (typeof warning === "string") throw Error(warning);
        else if (
            warning.code !== "CIRCULAR_DEPENDENCY" ||
            !warning.importer ||
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            !ignoredCircular.includes(warning.importer!)
        ) {
            throw Error(warning.message);
        }
    },*/

    plugins: [typescript({ tsconfig: resolve("./src/tsconfig.json") })],
    watch: {
        chokidar: false,
    },
});

export default getConfig();
