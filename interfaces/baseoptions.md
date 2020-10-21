# Interface: BaseOptions

All instance-specific options and behaviors to initialize the tree.

## Hierarchy

* TreeConfiguration

  ↳ **BaseOptions**

## Index

### Properties

* [checkboxRecursiveSelect](baseoptions.md#checkboxrecursiveselect)
* [css](baseoptions.md#css)
* [nodes](baseoptions.md#nodes)
* [searchBar](baseoptions.md#searchbar)
* [searchBarFocus](baseoptions.md#searchbarfocus)
* [templateSelectedText](baseoptions.md#templateselectedtext)
* [treeViewCheckboxes](baseoptions.md#treeviewcheckboxes)
* [watermark](baseoptions.md#watermark)

## Properties

### checkboxRecursiveSelect

•  **checkboxRecursiveSelect**: boolean

*Inherited from void*

*Defined in [types/options.ts:60](https://github.com/ckotzbauer/simple-tree-component/blob/4c3a2a5/src/types/options.ts#L60)*

Indicates if the checkbox-value of a parent-node should also change the value of its childs.
(Default: `false`)

___

### css

•  **css**: { dropdownHolder: string  }

*Inherited from void*

*Defined in [types/options.ts:32](https://github.com/ckotzbauer/simple-tree-component/blob/4c3a2a5/src/types/options.ts#L32)*

Custom css-classes.

#### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`dropdownHolder` | string | Custom css-class added to the dropdown-container element. Only used in modes `singleSelectDropdown` and `multiSelectDropdown`. (Default: `""`) |

___

### nodes

•  **nodes**: [TreeNode](treenode.md)[]

*Defined in [types/options.ts:71](https://github.com/ckotzbauer/simple-tree-component/blob/4c3a2a5/src/types/options.ts#L71)*

All tree-node data-objects to start with.
(Default: `[]`)

___

### searchBar

•  **searchBar**: boolean

*Inherited from void*

*Defined in [types/options.ts:15](https://github.com/ckotzbauer/simple-tree-component/blob/4c3a2a5/src/types/options.ts#L15)*

Add a searchbar to search for tree-nodes. (Default: `true`)

___

### searchBarFocus

•  **searchBarFocus**: boolean

*Inherited from void*

*Defined in [types/options.ts:20](https://github.com/ckotzbauer/simple-tree-component/blob/4c3a2a5/src/types/options.ts#L20)*

Determines if the searchbar requests the focus by default. (Default: `false`)

___

### templateSelectedText

•  **templateSelectedText**: (node: [TreeNode](treenode.md)) => string

*Inherited from void*

*Defined in [types/options.ts:47](https://github.com/ckotzbauer/simple-tree-component/blob/4c3a2a5/src/types/options.ts#L47)*

Template function which is called if the given node is selected.
Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.

**`param`** The tree-node to return a text-value for.

**`returns`** Any string value which should be displayed. (Default: `node.label`)

___

### treeViewCheckboxes

•  **treeViewCheckboxes**: boolean

*Inherited from void*

*Defined in [types/options.ts:54](https://github.com/ckotzbauer/simple-tree-component/blob/4c3a2a5/src/types/options.ts#L54)*

Enable checkboxes in the tree-only-view mode. This also enables multi-selection.
Only used in mode `view`.
(Default: `false`)

___

### watermark

•  **watermark**: string

*Inherited from void*

*Defined in [types/options.ts:27](https://github.com/ckotzbauer/simple-tree-component/blob/4c3a2a5/src/types/options.ts#L27)*

A watermark text which is displayed if no value is selected.
Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.
(Default: `Please select a value...`)
