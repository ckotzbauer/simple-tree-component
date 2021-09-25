# Simple Tree Component

![build](https://github.com/ckotzbauer/simple-tree-component/workflows/build/badge.svg)
[![codecov](https://codecov.io/gh/ckotzbauer/simple-tree-component/branch/main/graph/badge.svg?token=CDK8TH9DLZ)](https://codecov.io/gh/ckotzbauer/simple-tree-component)
[![NPM](https://img.shields.io/npm/v/simple-tree-component.svg)](https://www.npmjs.com/package/simple-tree-component)

> This pure JavaScript component comes without any dependencies and is targeted to modern browsers. Full TypeScript support is available.


## Installation

Install with NPM:
```
npm install simple-tree-component
```
TypeScript definitions are included in the npm package.

## Usage

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
                    value: "p1c2"
                }
            ]
        }
    ]
});

instance.setReadOnly(true);
```

You can find more documentation [here](https://www.ckotzbauer.de/simple-tree-component).


[Contributing](https://github.com/ckotzbauer/simple-tree-component/blob/main/.github/CONTRIBUTING.md)
--------
[License](https://github.com/ckotzbauer/simple-tree-component/blob/main/LICENSE)
--------
[Changelog](https://github.com/ckotzbauer/simple-tree-component/blob/main/CHANGELOG.md)
--------
### Blog post
https://dev.to/ckotzbauer/announcing-the-simple-tree-component-46nd


