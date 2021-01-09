# Simple Tree Component

![build](https://github.com/ckotzbauer/simple-tree-component/workflows/build/badge.svg)
[![codecov](https://codecov.io/gh/ckotzbauer/simple-tree-component/branch/master/graph/badge.svg?token=CDK8TH9DLZ)](https://codecov.io/gh/ckotzbauer/simple-tree-component)
[![NPM](https://img.shields.io/npm/v/simple-tree-component.svg)](https://www.npmjs.com/package/simple-tree-component)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fckotzbauer%2Fsimple-tree-component.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fckotzbauer%2Fsimple-tree-component?ref=badge_shield)

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


[Contributing](https://github.com/ckotzbauer/simple-tree-component/blob/master/.github/CONTRIBUTING.md)
--------
[License](https://github.com/ckotzbauer/simple-tree-component/blob/master/LICENSE)
--------
[Changelog](https://github.com/ckotzbauer/simple-tree-component/blob/master/CHANGELOG.md)
--------


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fckotzbauer%2Fsimple-tree-component.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fckotzbauer%2Fsimple-tree-component?ref=badge_large)