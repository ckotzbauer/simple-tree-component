import fs from "fs";
import path from "path";

const files = ["index.html", ".nojekyll"];
const ignoreFiles = ["_sidebar.md"];

(async () => {
    const docsDir = __dirname;
    const outDir = path.join(__dirname, "out");
    const assetsDir = path.join(__dirname, "assets");
    const outAssetsDir = path.join(outDir, "assets");

    const filesInFolder = await fs.promises.readdir(docsDir);
    const mdFiles = filesInFolder.filter((f) => f.endsWith(".md") && !ignoreFiles.includes(f));

    await fs.promises.mkdir(outAssetsDir);

    await Promise.all(files.map((f) => fs.promises.copyFile(`${docsDir}/${f}`, `${outDir}/${f}`)));
    await Promise.all(mdFiles.map((f) => fs.promises.copyFile(`${docsDir}/${f}`, `${outDir}/${f}`)));
    await Promise.all(
        (await fs.promises.readdir(assetsDir)).map((f) => fs.promises.copyFile(`${assetsDir}/${f}`, `${outAssetsDir}/${f}`))
    );

    // Merge Sidebar
    const typesSidebar = await generateTypesSidebar(outDir);
    const generalSidebar = (await fs.promises.readFile(`${docsDir}/_sidebar.md`)).toString();
    const fullSidebar = generalSidebar + "\n" + typesSidebar;

    await fs.promises.writeFile(`${outDir}/_sidebar.md`, fullSidebar);

    // Copy CONTRIBUTING
    await fs.promises.copyFile(`${path.join(docsDir, "..", ".github")}/CONTRIBUTING.md`, `${outDir}/CONTRIBUTING.md`);

    console.log("Documentation copied successfully!");
})();

async function generateTypesSidebar(outDir: string): Promise<string> {
    const interfaces = await fs.promises.readdir(`${outDir}/interfaces`);
    const interfaceLines = interfaces.map(
        async (f) => `    - [${await extractTitle(outDir, f, "Interface", "interfaces")}](interfaces/${f})`
    );
    const modules = await fs.promises.readdir(`${outDir}/modules`);
    const moduleLines = modules.map(async (f) => `    - [${await extractTitle(outDir, f, "Module", "modules")}](modules/${f})`);
    const lines = [
        "- Types Documentation",
        "  - Interfaces",
        ...(await Promise.all(interfaceLines)),
        "  - Modules",
        ...(await Promise.all(moduleLines)),
    ];
    return lines.join("\n");
}

async function extractTitle(outDir: string, file: string, title: string, path: string): Promise<string | undefined> {
    const regex = new RegExp(`# ${title}: (?<type>[a-zA-Z]*)`, "g");
    const content = (await fs.promises.readFile(`${outDir}/${path}/${file}`)).toString();
    return regex.exec(content)?.groups?.type;
}
