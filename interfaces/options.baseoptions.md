[options](../modules/options.md).BaseOptions

All instance-specific options and behaviors to initialize the tree.

## Hierarchy

* *TreeConfiguration*

  ↳ **BaseOptions**

## Table of contents

### Properties

- [checkboxes](options.baseoptions.md#checkboxes)
- [css](options.baseoptions.md#css)
- [nodes](options.baseoptions.md#nodes)
- [searchBar](options.baseoptions.md#searchbar)
- [searchBarFocus](options.baseoptions.md#searchbarfocus)
- [templateSelectedText](options.baseoptions.md#templateselectedtext)
- [watermark](options.baseoptions.md#watermark)

## Properties

### checkboxes

• **checkboxes**: *object*

Checkbox settings.
Only used in mode `tree`.

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`active` | *boolean* | Enable checkboxes. This also enables multi-selection. (Default: `false`)   |
`recursive`? | *boolean* | Indicates if the checkbox-value of a parent-node should also change the value of its childs. (Default: `false`)   |

Inherited from: void

Defined in: [options.ts:53](https://github.com/ckotzbauer/simple-tree-component/blob/7a66e99/src/types/options.ts#L53)

___

### css

• **css**: *object*

Custom css-classes.

#### Type declaration:

Name | Type | Description |
:------ | :------ | :------ |
`dropdownHolder` | *string* | Custom css-class added to the dropdown-container element. Only used in modes `singleSelectDropdown` and `multiSelectDropdown`. (Default: `""`)   |

Inherited from: void

Defined in: [options.ts:32](https://github.com/ckotzbauer/simple-tree-component/blob/7a66e99/src/types/options.ts#L32)

___

### nodes

• **nodes**: [*TreeNode*](tree_node.treenode.md)[]

All tree-node data-objects to start with. Do not change this array afterwards.
(Default: `[]`)

Defined in: [options.ts:76](https://github.com/ckotzbauer/simple-tree-component/blob/7a66e99/src/types/options.ts#L76)

___

### searchBar

• **searchBar**: *boolean*

Add a searchbar to search for tree-nodes. (Default: `true`)

Inherited from: void

Defined in: [options.ts:15](https://github.com/ckotzbauer/simple-tree-component/blob/7a66e99/src/types/options.ts#L15)

___

### searchBarFocus

• **searchBarFocus**: *boolean*

Determines if the searchbar requests the focus by default. (Default: `false`)

Inherited from: void

Defined in: [options.ts:20](https://github.com/ckotzbauer/simple-tree-component/blob/7a66e99/src/types/options.ts#L20)

___

### templateSelectedText

• **templateSelectedText**: (`node`: [*TreeNode*](tree_node.treenode.md)) => *string*

Template function which is called if the given node is selected.
Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.

**`param`** The tree-node to return a text-value for.

**`returns`** Any string value which should be displayed. (Default: `node.label`)

#### Type declaration:

▸ (`node`: [*TreeNode*](tree_node.treenode.md)): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`node` | [*TreeNode*](tree_node.treenode.md) |

**Returns:** *string*

Defined in: [options.ts:47](https://github.com/ckotzbauer/simple-tree-component/blob/7a66e99/src/types/options.ts#L47)

Inherited from: void

Defined in: [options.ts:47](https://github.com/ckotzbauer/simple-tree-component/blob/7a66e99/src/types/options.ts#L47)

___

### watermark

• **watermark**: *string*

A watermark text which is displayed if no value is selected.
Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.
(Default: `Please select a value...`)

Inherited from: void

Defined in: [options.ts:27](https://github.com/ckotzbauer/simple-tree-component/blob/7a66e99/src/types/options.ts#L27)
