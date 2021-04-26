# Interface: BaseOptions

[options](../modules/options.md).BaseOptions

All instance-specific options and behaviors to initialize the tree.

## Hierarchy

* *TreeConfiguration*

  ↳ **BaseOptions**

## Table of contents

### Properties

- [checkboxes](options.baseoptions.md#checkboxes)
- [clearButton](options.baseoptions.md#clearbutton)
- [css](options.baseoptions.md#css)
- [highlightSearchResults](options.baseoptions.md#highlightsearchresults)
- [noNodesMessage](options.baseoptions.md#nonodesmessage)
- [nodes](options.baseoptions.md#nodes)
- [scrollContainer](options.baseoptions.md#scrollcontainer)
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

| Name | Type | Description |
| :------ | :------ | :------ |
| `active` | *boolean* | Enable checkboxes. This also enables multi-selection. (Default: `false`) |
| `recursive?` | *boolean* | Indicates if the checkbox-value of a parent-node should also change the value of its childs. (Default: `false`) |

Inherited from: TreeConfiguration.checkboxes

Defined in: [options.ts:64](https://github.com/ckotzbauer/simple-tree-component/blob/686c582/src/types/options.ts#L64)

___

### clearButton

• **clearButton**: *boolean*

Add a cross-button to clear the current value(s). (Default: `false`)

Inherited from: TreeConfiguration.clearButton

Defined in: [options.ts:81](https://github.com/ckotzbauer/simple-tree-component/blob/686c582/src/types/options.ts#L81)

___

### css

• **css**: *object*

Custom css-classes.

#### Type declaration:

| Name | Type | Description |
| :------ | :------ | :------ |
| `dropdownHolder` | *string* | Custom css-class added to the dropdown-container element. Only used in modes `singleSelectDropdown` and `multiSelectDropdown`. (Default: `""`) |

Inherited from: TreeConfiguration.css

Defined in: [options.ts:43](https://github.com/ckotzbauer/simple-tree-component/blob/686c582/src/types/options.ts#L43)

___

### highlightSearchResults

• **highlightSearchResults**: *boolean*

Enables text-highlighting while searching. (Default: `false`)

Inherited from: TreeConfiguration.highlightSearchResults

Defined in: [options.ts:25](https://github.com/ckotzbauer/simple-tree-component/blob/686c582/src/types/options.ts#L25)

___

### noNodesMessage

• **noNodesMessage**: *string*

A message text which is displayed if no tree-nodes are available at all or through filtering.
(Default: `No items found.`)

Inherited from: TreeConfiguration.noNodesMessage

Defined in: [options.ts:38](https://github.com/ckotzbauer/simple-tree-component/blob/686c582/src/types/options.ts#L38)

___

### nodes

• **nodes**: [*TreeNode*](tree_node.treenode.md)[]

All tree-node data-objects to start with. Do not change this array afterwards.
(Default: `[]`)

Defined in: [options.ts:97](https://github.com/ckotzbauer/simple-tree-component/blob/686c582/src/types/options.ts#L97)

___

### scrollContainer

• **scrollContainer**: ``null`` \| HTMLElement

Element to prevent scrolling for when the dropdown is openend. (Default `null`)

Inherited from: TreeConfiguration.scrollContainer

Defined in: [options.ts:86](https://github.com/ckotzbauer/simple-tree-component/blob/686c582/src/types/options.ts#L86)

___

### searchBar

• **searchBar**: *boolean*

Add a searchbar to search for tree-nodes. (Default: `true`)

Inherited from: TreeConfiguration.searchBar

Defined in: [options.ts:15](https://github.com/ckotzbauer/simple-tree-component/blob/686c582/src/types/options.ts#L15)

___

### searchBarFocus

• **searchBarFocus**: *boolean*

Determines if the searchbar requests the focus by default. (Default: `false`)

Inherited from: TreeConfiguration.searchBarFocus

Defined in: [options.ts:20](https://github.com/ckotzbauer/simple-tree-component/blob/686c582/src/types/options.ts#L20)

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

| Name | Type |
| :------ | :------ |
| `node` | [*TreeNode*](tree_node.treenode.md) |

**Returns:** *string*

Defined in: [options.ts:58](https://github.com/ckotzbauer/simple-tree-component/blob/686c582/src/types/options.ts#L58)

Inherited from: TreeConfiguration.templateSelectedText

Defined in: [options.ts:58](https://github.com/ckotzbauer/simple-tree-component/blob/686c582/src/types/options.ts#L58)

___

### watermark

• **watermark**: *string*

A watermark text which is displayed if no value is selected.
Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.
(Default: `Please select a value...`)

Inherited from: TreeConfiguration.watermark

Defined in: [options.ts:32](https://github.com/ckotzbauer/simple-tree-component/blob/686c582/src/types/options.ts#L32)
