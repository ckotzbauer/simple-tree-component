[**Simple Tree Component**](../../README.md)

***

[Simple Tree Component](../../modules.md) / [options](../README.md) / BaseOptions

# Interface: BaseOptions

Defined in: [options.ts:124](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L124)

All instance-specific options and behaviors to initialize the tree.

## Properties

### checkboxes

> **checkboxes**: `object`

Defined in: [options.ts:81](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L81)

Checkbox settings.
Only used in mode `tree`.

#### active

> **active**: `boolean`

Enable checkboxes. This also enables multi-selection.
(Default: `false`)

#### recursive?

> `optional` **recursive?**: `boolean`

Indicates if the checkbox-value of a parent-node should also change the value of its childs.
(Default: `false`)

#### Inherited from

`TreeConfiguration.checkboxes`

***

### clearButton

> **clearButton**: `boolean`

Defined in: [options.ts:98](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L98)

Add a cross-button to clear the current value(s). (Default: `false`)

#### Inherited from

`TreeConfiguration.clearButton`

***

### css

> **css**: `object`

Defined in: [options.ts:60](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L60)

Custom css-classes.

#### dropdownHolder

> **dropdownHolder**: `string`

Custom css-class added to the dropdown-container element.
Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.
(Default: `""`)

#### Inherited from

`TreeConfiguration.css`

***

### defaultDropdownHeight

> **defaultDropdownHeight**: `number`

Defined in: [options.ts:111](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L111)

Custom default-height of the dropdown in pixel.
Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.
Note: to change the sass-variable `$max-dropdown-height` accordingly.
(Default: `300`)

#### Inherited from

`TreeConfiguration.defaultDropdownHeight`

***

### dragAndDrop

> **dragAndDrop**: `boolean`

Defined in: [options.ts:118](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L118)

Indicates if drag-and-drop of nodes on the same hierarchy-level is enabled.
Only used in `tree` mode.
(Default: `false`)

#### Inherited from

`TreeConfiguration.dragAndDrop`

***

### highlightSearchResults

> **highlightSearchResults**: `boolean`

Defined in: [options.ts:42](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L42)

Enables text-highlighting while searching. (Default: `false`)

#### Inherited from

`TreeConfiguration.highlightSearchResults`

***

### nodes

> **nodes**: [`InitTreeNode`](../../tree-node/interfaces/InitTreeNode.md)[]

Defined in: [options.ts:129](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L129)

All tree-node data-objects to start with. Do not change this array afterwards.
(Default: `[]`)

***

### noNodesMessage

> **noNodesMessage**: `string`

Defined in: [options.ts:55](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L55)

A message text which is displayed if no tree-nodes are available at all or through filtering.
(Default: `No items found.`)

#### Inherited from

`TreeConfiguration.noNodesMessage`

***

### scrollContainer

> **scrollContainer**: `HTMLElement` \| `null`

Defined in: [options.ts:103](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L103)

Element to prevent scrolling for when the dropdown is openend. (Default `null`)

#### Inherited from

`TreeConfiguration.scrollContainer`

***

### searchBar

> **searchBar**: `boolean`

Defined in: [options.ts:20](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L20)

Add a searchbar to search for tree-nodes. (Default: `true`)

#### Inherited from

`TreeConfiguration.searchBar`

***

### searchBarFocus

> **searchBarFocus**: `boolean`

Defined in: [options.ts:25](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L25)

Determines if the searchbar requests the focus by default. (Default: `false`)

#### Inherited from

`TreeConfiguration.searchBarFocus`

***

### searchMode

> **searchMode**: `SearchMode`

Defined in: [options.ts:31](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L31)

Determines if only matching tree-nodes are displayed as search-results (default). The second mode `OnlyMatchesAndChilds`
also displays non-matching child-nodes if one of the parent-nodes matches the search-text. (Default: `OnlyMatches`)

#### Inherited from

`TreeConfiguration.searchMode`

***

### searchPlaceholder

> **searchPlaceholder**: `string`

Defined in: [options.ts:37](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L37)

Placeholder shown for the search bar.
(Default: ``)

#### Inherited from

`TreeConfiguration.searchPlaceholder`

***

### templateSelectedText

> **templateSelectedText**: (`node`) => `string`

Defined in: [options.ts:75](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L75)

Template function which is called if the given node is selected.
Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.

#### Parameters

##### node

[`TreeNode`](../../tree-node/interfaces/TreeNode.md)

The tree-node to return a text-value for.

#### Returns

`string`

Any string value which should be displayed. (Default: `node.label`)

#### Inherited from

`TreeConfiguration.templateSelectedText`

***

### watermark

> **watermark**: `string`

Defined in: [options.ts:49](https://github.com/ckotzbauer/simple-tree-component/blob/fb8f2146acb3820d5d8b406536e654f013ebacf3/src/types/options.ts#L49)

A watermark text which is displayed if no value is selected.
Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.
(Default: `Please select a value...`)

#### Inherited from

`TreeConfiguration.watermark`
