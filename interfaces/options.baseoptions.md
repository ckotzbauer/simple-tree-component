# Interface: BaseOptions

[options](../modules/options.md).BaseOptions

All instance-specific options and behaviors to initialize the tree.

## Hierarchy

- `TreeConfiguration`

  ↳ **BaseOptions**

## Table of contents

### Properties

- [checkboxes](options.baseoptions.md#checkboxes)
- [clearButton](options.baseoptions.md#clearbutton)
- [css](options.baseoptions.md#css)
- [defaultDropdownHeight](options.baseoptions.md#defaultdropdownheight)
- [highlightSearchResults](options.baseoptions.md#highlightsearchresults)
- [noNodesMessage](options.baseoptions.md#nonodesmessage)
- [nodes](options.baseoptions.md#nodes)
- [scrollContainer](options.baseoptions.md#scrollcontainer)
- [searchBar](options.baseoptions.md#searchbar)
- [searchBarFocus](options.baseoptions.md#searchbarfocus)
- [searchMode](options.baseoptions.md#searchmode)
- [templateSelectedText](options.baseoptions.md#templateselectedtext)
- [watermark](options.baseoptions.md#watermark)

## Properties

### checkboxes

• **checkboxes**: `Object`

Checkbox settings.
Only used in mode `tree`.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `active` | `boolean` | Enable checkboxes. This also enables multi-selection. (Default: `false`) |
| `recursive?` | `boolean` | Indicates if the checkbox-value of a parent-node should also change the value of its childs. (Default: `false`) |

#### Inherited from

TreeConfiguration.checkboxes

#### Defined in

[options.ts:75](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/options.ts#L75)

___

### clearButton

• **clearButton**: `boolean`

Add a cross-button to clear the current value(s). (Default: `false`)

#### Inherited from

TreeConfiguration.clearButton

#### Defined in

[options.ts:92](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/options.ts#L92)

___

### css

• **css**: `Object`

Custom css-classes.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `dropdownHolder` | `string` | Custom css-class added to the dropdown-container element. Only used in modes `singleSelectDropdown` and `multiSelectDropdown`. (Default: `""`) |

#### Inherited from

TreeConfiguration.css

#### Defined in

[options.ts:54](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/options.ts#L54)

___

### defaultDropdownHeight

• **defaultDropdownHeight**: `number`

Custom default-height of the dropdown in pixel.
Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.
Note: to change the sass-variable `$max-dropdown-height` accordingly.
(Default: `300`)

#### Inherited from

TreeConfiguration.defaultDropdownHeight

#### Defined in

[options.ts:105](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/options.ts#L105)

___

### highlightSearchResults

• **highlightSearchResults**: `boolean`

Enables text-highlighting while searching. (Default: `false`)

#### Inherited from

TreeConfiguration.highlightSearchResults

#### Defined in

[options.ts:36](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/options.ts#L36)

___

### noNodesMessage

• **noNodesMessage**: `string`

A message text which is displayed if no tree-nodes are available at all or through filtering.
(Default: `No items found.`)

#### Inherited from

TreeConfiguration.noNodesMessage

#### Defined in

[options.ts:49](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/options.ts#L49)

___

### nodes

• **nodes**: [TreeNode](tree_node.treenode.md)[]

All tree-node data-objects to start with. Do not change this array afterwards.
(Default: `[]`)

#### Defined in

[options.ts:116](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/options.ts#L116)

___

### scrollContainer

• **scrollContainer**: ``null`` \| `HTMLElement`

Element to prevent scrolling for when the dropdown is openend. (Default `null`)

#### Inherited from

TreeConfiguration.scrollContainer

#### Defined in

[options.ts:97](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/options.ts#L97)

___

### searchBar

• **searchBar**: `boolean`

Add a searchbar to search for tree-nodes. (Default: `true`)

#### Inherited from

TreeConfiguration.searchBar

#### Defined in

[options.ts:20](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/options.ts#L20)

___

### searchBarFocus

• **searchBarFocus**: `boolean`

Determines if the searchbar requests the focus by default. (Default: `false`)

#### Inherited from

TreeConfiguration.searchBarFocus

#### Defined in

[options.ts:25](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/options.ts#L25)

___

### searchMode

• **searchMode**: `SearchMode`

Determines if only matching tree-nodes are displayed as search-results (default). The second mode `OnlyMatchesAndChilds`
also displays non-matching child-nodes if one of the parent-nodes matches the search-text. (Default: `OnlyMatches`)

#### Inherited from

TreeConfiguration.searchMode

#### Defined in

[options.ts:31](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/options.ts#L31)

___

### templateSelectedText

• **templateSelectedText**: (`node`: [TreeNode](tree_node.treenode.md)) => `string`

#### Type declaration

▸ (`node`): `string`

Template function which is called if the given node is selected.
Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [TreeNode](tree_node.treenode.md) | The tree-node to return a text-value for. |

##### Returns

`string`

Any string value which should be displayed. (Default: `node.label`)

#### Inherited from

TreeConfiguration.templateSelectedText

#### Defined in

[options.ts:69](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/options.ts#L69)

___

### watermark

• **watermark**: `string`

A watermark text which is displayed if no value is selected.
Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.
(Default: `Please select a value...`)

#### Inherited from

TreeConfiguration.watermark

#### Defined in

[options.ts:43](https://github.com/ckotzbauer/simple-tree-component/blob/0e3e17d/src/types/options.ts#L43)
