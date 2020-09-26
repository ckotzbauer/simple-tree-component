import fs from "fs";
import path from "path";

const files = ["index.html", ".nojekyll"];
const ignoreFiles = ["_sidebar.md"];

(async () => {
    const docsDir = __dirname;
    const outDir = path.join(__dirname, "out");

    const filesInFolder = await fs.promises.readdir(docsDir);
    const mdFiles = filesInFolder.filter((f) => f.endsWith(".md") && !ignoreFiles.includes(f));

    await Promise.all(files.map((f) => fs.promises.copyFile(`${docsDir}/${f}`, `${outDir}/${f}`)));
    await Promise.all(mdFiles.map((f) => fs.promises.copyFile(`${docsDir}/${f}`, `${outDir}/${f}`)));

    // Merge Sidebar
    const typesSidebar = (await fs.promises.readFile(`${outDir}/_sidebar.md`)).toString();
    const generalSidebar = (await fs.promises.readFile(`${docsDir}/_sidebar.md`)).toString();
    const fullSidebar = generalSidebar + "\n" + typesSidebar.replace(/- \[Summary\]/g, "  - [Summary]");

    await fs.promises.writeFile(`${outDir}/_sidebar.md`, fullSidebar);

    // Copy CONTRIBUTING
    await fs.promises.copyFile(`${path.join(docsDir, "..", ".github")}/CONTRIBUTING.md`, `${outDir}/CONTRIBUTING.md`);

    console.log("Documentation copied successfully!");
})();
