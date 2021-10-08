
# Quick start

## Browser support

The library is compiled with `ES2015` JS-Target, so all modern major browser should basically be supported.


## Installation

```sh
npm install simple-tree-component
```

Typescript definitions are also included in this npm-package.


## Integration

Add the CSS-Stylesheet and the JS-File to your `index.html`:

```html
<html>
    <head>
        ...
        <link rel="stylesheet" href="./node_modules/simple-tree-component/dist/simple-tree-component.css">
    </head>
    <body>
        <script src="./node_modules/simple-tree-component/dist/simple-tree-component.js"></script>
        ...
    </body>
</html>
```

Also check out the demo integration for:

* [Aurelia 1](https://github.com/ckotzbauer/simple-tree-component/tree/main/demo)


### First usage

Basic example for a single-selection tree:

```html
<div class="root-1"></div>
```

```js
import simpleTree from "simple-tree-component";

const instance = simpleTree(".root-1", "singleSelectDropdown", {
    nodes: [
        {
            label: "Parent 1",
            value: "p1",
            children: [
                {
                    label: "Parent 1 - Child 1",
                    value: "p1c1"
                },
                {
                    label: "Parent 1 - Child 2",
                    value: "p1c2",
                    selected: true
                }
            ]
        }
    ]
});
```

The component consists of three modes which are designed for different use-cases:

* [Single-select mode](single-select-mode.md) is a drop-down component where one item of the tree can be selected.
* [Multi-select mode](multi-select-mode.md) is a drop-down component where multiple items of the tree can be selected.
* [View mode](view-mode.md) renders the tree directly and uses single-selection by default or multi-selection with checkboxes.


## FAQ

#### Why changes to `TreeNode` objects do not affect the tree?
All `TreeNode` objects which were returned from the API have a broken object-reference by-design to avoid unintentional changes to objects
within the tree. So changing the selection-state of a node for example with `node.selected = true` will not work.

#### How can I select a node directly on initialization?
To select a specific node directly on component-initialization, you can simply set the `selected` property of the node to `true` as shown in the example above.

