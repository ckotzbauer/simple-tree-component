import { readFile, writeFile, copyFile, exists, mkdir } from "fs";
import { promisify } from "util";
import { exec as execCommand } from "child_process";

import terser from "terser";
import chokidar from "chokidar";
import sass, { Result } from "node-sass";
import { process as autoPrefixerProcess } from "autoprefixer";

import * as rollup from "rollup";
import rollupConfig, { getConfig } from "./config/rollup";

import * as pkg from "./package.json";
const version = `/* simple-tree-component v${pkg.version},, @license MIT */`;

// eslint-disable-next-line @typescript-eslint/naming-convention
const DEV_MODE = process.argv.indexOf("--dev") > -1;

const paths = {
    style: "./src/style/index.scss",
};

const watchers: chokidar.FSWatcher[] = [];

function logErr(e: Error | string) {
    console.error(e);
}

async function readFileAsync(path: string): Promise<string> {
    try {
        const buf = await promisify(readFile)(path);
        return buf.toString();
    } catch (e) {
        logErr(e);
        return e.toString();
    }
}

function uglify(src: string) {
    const minified = terser.minify(src, {
        output: {
            preamble: version,
            comments: false,
        },
    });

    if (minified.error) {
        logErr(minified.error);
    }
    return minified.code;
}

async function buildBundleJs() {
    const bundle = await rollup.rollup(rollupConfig);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return bundle.write(rollupConfig.output as rollup.OutputOptions);
}

async function buildScripts() {
    try {
        await buildBundleJs();
        const transpiled = await readFileAsync("./dist/simple-tree-component.js");
        promisify(writeFile)("./dist/simple-tree-component.min.js", uglify(transpiled));
    } catch (e) {
        logErr(e);
    }
}

async function transpileStyle(src: string, compress = false) {
    return new Promise<string>((resolve, reject) => {
        sass.render(
            {
                file: src,
                outputStyle: compress ? "compressed" : "expanded",
            },
            (err: Error | undefined, result: Result) =>
                !err ? resolve(autoPrefixerProcess(result.css.toString()).css) : reject(err)
        );
    });
}

async function buildStyle() {
    try {
        await Promise.all([
            promisify(writeFile)("./dist/simple-tree-component.css", await transpileStyle(paths.style)),
            promisify(writeFile)("./dist/simple-tree-component.min.css", await transpileStyle(paths.style, true)),
        ]);
    } catch (e) {
        logErr(e);
    }
}

async function ensureDistFolder() {
    try {
        if (!(await promisify(exists)("./dist"))) {
            await promisify(mkdir)("./dist");
        }
    } catch (e) {
        logErr(e);
    }
}

function setupWatchers() {
    watch("./src/style/*.scss", () => {
        buildStyle();
    });
    watch("./src", (path: string) => {
        execCommand(`npm run format -- ${path}`, {
            cwd: __dirname,
        });
    });
    watch("./index.template.html", async () => {
        await promisify(copyFile)("./index.template.html", "./index.html");
    });
}

function watch(path: string, cb: (path: string) => void = (s: string) => s) {
    watchers.push(
        chokidar
            .watch(path, {
                // awaitWriteFinish: {
                //   stabilityThreshold: 500,
                // },
                //usePolling: true,
            })
            .on("change", cb)
            .on("error", logErr)
    );
}

async function start() {
    if (DEV_MODE) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (rollupConfig.output as rollup.OutputOptions).sourcemap = true;
        await promisify(copyFile)("./index.template.html", "./index.html");
        const write = (s: string) => process.stdout.write(`rollup: ${s}`);
        const watcher = rollup.watch([getConfig({ dev: true })]);

        watcher.on("event", logEvent);

        function exit() {
            watcher.close();
            watchers.forEach((w) => w.close());
        }

        interface RollupWatchEvent {
            code: string;
            input?: string | string[] | { [key: string]: string };
            output?: readonly string[];
        }

        function logEvent(e: RollupWatchEvent) {
            write(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                [e.code, e.input && `${e.input} -> ${e.output!}`, "\n"].filter((x) => x).join(" ")
            );
        }

        //catches ctrl+c event
        process.on("SIGINT", exit);

        // catches "kill pid" (for example: nodemon restart)
        process.on("SIGUSR1", exit);
        process.on("SIGUSR2", exit);

        setupWatchers();
    }

    ensureDistFolder();
    buildScripts();
    buildStyle();
}

start();
