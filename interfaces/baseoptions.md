# Interface: BaseOptions

All instance-specific options and behaviors to initialize the tree.

## Hierarchy

* TreeConfiguration

  ↳ **BaseOptions**

## Index

### Properties

* [checkboxes](baseoptions.md#checkboxes)
* [css](baseoptions.md#css)
* [nodes](baseoptions.md#nodes)
* [searchBar](baseoptions.md#searchbar)
* [searchBarFocus](baseoptions.md#searchbarfocus)
* [templateSelectedText](baseoptions.md#templateselectedtext)
* [watermark](baseoptions.md#watermark)

## Properties

### checkboxes

•  **checkboxes**: { active: boolean ; recursive?: undefined \| false \| true  }

*Inherited from void*

*Defined in [types/options.ts:53](https://github.com/ckotzbauer/simple-tree-component/blob/0dc2fcc/src/types/options.ts#L53)*

Checkbox settings.
Only used in mode `tree`.

#### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`active` | boolean | Enable checkboxes. This also enables multi-selection. (Default: `false`) |
`recursive?` | undefined \| false \| true | Indicates if the checkbox-value of a parent-node should also change the value of its childs. (Default: `false`) |

___

### css

•  **css**: { dropdownHolder: string  }

*Inherited from void*

*Defined in [types/options.ts:32](https://github.com/ckotzbauer/simple-tree-component/blob/0dc2fcc/src/types/options.ts#L32)*

Custom css-classes.

#### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`dropdownHolder` | string | Custom css-class added to the dropdown-container element. Only used in modes `singleSelectDropdown` and `multiSelectDropdown`. (Default: `""`) |

___

### nodes

•  **nodes**: [TreeNode](treenode.md)[]

*Defined in [types/options.ts:76](https://github.com/ckotzbauer/simple-tree-component/blob/0dc2fcc/src/types/options.ts#L76)*

All tree-node data-objects to start with. Do not change this array afterwards.
(Default: `[]`)

___

### searchBar

•  **searchBar**: boolean

*Inherited from void*

*Defined in [types/options.ts:15](https://github.com/ckotzbauer/simple-tree-component/blob/0dc2fcc/src/types/options.ts#L15)*

Add a searchbar to search for tree-nodes. (Default: `true`)

___

### searchBarFocus

•  **searchBarFocus**: boolean

*Inherited from void*

*Defined in [types/options.ts:20](https://github.com/ckotzbauer/simple-tree-component/blob/0dc2fcc/src/types/options.ts#L20)*

Determines if the searchbar requests the focus by default. (Default: `false`)

___

### templateSelectedText

•  **templateSelectedText**: (node: [TreeNode](treenode.md)) => string

*Inherited from void*

*Defined in [types/options.ts:47](https://github.com/ckotzbauer/simple-tree-component/blob/0dc2fcc/src/types/options.ts#L47)*

Template function which is called if the given node is selected.
Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.

**`param`** The tree-node to return a text-value for.

**`returns`** Any string value which should be displayed. (Default: `node.label`)

___

### watermark

•  **watermark**: string

*Inherited from void*

*Defined in [types/options.ts:27](https://github.com/ckotzbauer/simple-tree-component/blob/0dc2fcc/src/types/options.ts#L27)*

A watermark text which is displayed if no value is selected.
Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.
(Default: `Please select a value...`)
