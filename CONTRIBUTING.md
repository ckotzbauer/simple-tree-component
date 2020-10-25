# Contribution guidelines

Thank you for your interest in contributing to `simple-tree-component`!
Contributions are welcome from beginners and seasoned developers alike.

### Bugs

If you've found a bug, create a new issue first, then submit a pull request.

If at any point you are having trouble navigating/understanding the code base, please don't hesitate to ask for help :)

### Feature Requests

If you'd like to see a certain feature in simple-tree-component, file an issue first with request for consideration.

### How to submit a pull request

1. Fork the repository.
2. Setup the necessary dependencies by running `npm install`.
3. Then, `npm start` to launch the dev environment.
4. `src/index.ts` is the entry point, `index.html` is where you can experiment with options.
5. Make desired changes, write tests and update the docs if needed. (Ensure correct code-style with `npm run format` and `npm run lint`)
5. Commit and push. (See commit message guidelines)
6. Go to https://github.com/ckotzbauer/simple-tree-component/compare?expand=1

### Important commands

* `npm start`: Launch the dev environment and watch for changes.
* `npm run build`: Compiles the whole codebase.
* `npm run test`: Runs unit-tests.
* `npm run format`: Runs prettier to apply code-style rules.
* `npm run lint`: Runs eslint to check code-style.
* `npm run build:docs`: Builds the documentation (incl. api-docs).
* `npm run docs:serve`: Starts a webserver to serve the docs.

### Commit message guidelines

A good commit message should describe what changed and why.

1. The first line should:
   * contain a short description of the change (preferably 50 characters or less)
   * be entirely in lowercase with the exception of proper nouns, acronyms, and
   the words that refer to code, like function/variable names
   * be prefixed with the type of the change: (chore, fix, feat, perf, refactor, test, doc, build)

   Examples:
   * `feat: add support for large trees`
   * `fix: fix error in newest chrome version`

2. Keep the second line blank.
3. A longer description of the change (if needed)

4. If your patch fixes an open issue, you can add a reference to it at the end
   of the log. Use the `Fixes:` prefix and the number of the issue. For other
   references use `Refs:`.

   Examples:
   * `Fixes: #1337`
   * `Refs: #3615`

Sample complete commit message:

```txt
type: explain the commit in one line

The body of the commit message should be one or more paragraphs, explaining
things in more detail if this is needed.

Fixes: #1337
```

If you are new to contributing to the Simple-Tree-Component, please try to do your best at
conforming to these guidelines, but do not worry if you get something wrong.
One of the contributors will help get things situated and the
contributor landing the Pull Request will ensure that everything follows
the project guidelines. ;)

### How to debug in vscode

1. Setup a local repo as above (How to submit a pull request).
2. Install the [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
3. Add the following configuration to `${workspaceFolder}/.vscode/launch.json`
```
{
    "version": "0.1.0",
    "configurations": [
        {
            "name": "Launch SimpleTree Quick Start",
            "type": "chrome",
            "request": "launch",
            "url": "http://localhost:8000/index.html",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```
4. Make sure the development server is started `npm start`
5. Set your desired breakpoints in the typescipt source files.
6. Click on the debug symbol on the actions bar.
7. Click on the play button to start the debug session in a new Chrome browser window.

## Create a release

1. Trigger the `create-release` GitHub Action through UI with the new version.
2. If the action succeeds, pull the changes locally (working tree should be clean).
3. Publish to npm with `npm publish`

## License

By submitting a contribution to this project, you agree to allow the project
owners to license your work as part of this project under this project's MIT
[license](LICENSE).
