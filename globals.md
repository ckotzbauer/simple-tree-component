# Simple Tree Component

## Index

### Namespaces

* [\_\_global](modules/__global.md)

### Interfaces

* [BaseOptions](interfaces/baseoptions.md)
* [Instance](interfaces/instance.md)
* [Rect](interfaces/rect.md)
* [SimpleTreeFn](interfaces/simpletreefn.md)
* [Subscription](interfaces/subscription.md)
* [TreeModeNameMap](interfaces/treemodenamemap.md)
* [TreeNode](interfaces/treenode.md)

### Type aliases

* [Options](globals.md#options)
* [SimpleTree](globals.md#simpletree)

### Functions

* [calculate](globals.md#calculate)
* [calculateOverlayPlacement](globals.md#calculateoverlayplacement)

## Type aliases

### Options

Ƭ  **Options**: Partial\<[BaseOptions](interfaces/baseoptions.md)>

*Defined in [types/options.ts:93](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/options.ts#L93)*

A partial representation of `BaseOptions`. All other values are set to its defaults.

___

### SimpleTree

Ƭ  **SimpleTree**: [Instance](interfaces/instance.md)\<\"singleSelectDropdown\" \| \"multiSelectDropdown\" \| \"view\">

*Defined in [types/instance.ts:93](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/instance.ts#L93)*

## Functions

### calculate

▸ **calculate**(`elementRect`: [Rect](interfaces/rect.md), `availableHeight`: number, `overlayHeight`: number, `borderWith?`: undefined \| number, `maxOverlayHeight?`: undefined \| number): [Rect](interfaces/rect.md)

*Defined in [types/rects.ts:40](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/rects.ts#L40)*

Calculates a rectangle to display a overlay-flyout relative to the position of the given `elementRect`.
The following strategy is used (in order):
  1. The overlay can be placed with its `overlayHeight` below of the `elementRect` without exceeding the `availableHeight`.
  2. The overlay can be placed with its `overlayHeight` above of the `elementRect` with a top greater `0`.
  3. The overlay is placed below of the `elementRect` with a reduced height to fit into `availableHeight`.

It is assumed, that the width of the overlay is the same as of the `elementRect`.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`elementRect` | [Rect](interfaces/rect.md) | The rectangle of the element this calculation belongs to. (e.g. rectangle of the selectbox for which the position of the flyout should be calculated.) |
`availableHeight` | number | Full height of the surrounding container (e.g. window height) |
`overlayHeight` | number | The height of the overlay which should be positioned. |
`borderWith?` | undefined \| number | The border-width used. It is assumed, that all borders have the same width. Defaults to `0` |
`maxOverlayHeight?` | undefined \| number | The maximum height of the overlay. Defaults to `300`. |

**Returns:** [Rect](interfaces/rect.md)

The calculated rectangle of the overlay position.

___

### calculateOverlayPlacement

▸ **calculateOverlayPlacement**(`overlay`: [HTMLElement](interfaces/__global.htmlelement.md), `element`: [HTMLElement](interfaces/__global.htmlelement.md), `maxHeight?`: undefined \| number): void

*Defined in [types/rects.ts:56](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/rects.ts#L56)*

Calculates the position of the `overlay` relative to the `element` and sets the values accordingly.
See the docs of the `calculate` function for more details.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`overlay` | [HTMLElement](interfaces/__global.htmlelement.md) | The HTML element of the overlay, which should be placed correctly. |
`element` | [HTMLElement](interfaces/__global.htmlelement.md) | The HTML element to which the `overlay` belongs. |
`maxHeight?` | undefined \| number | The maximum height of the overlay. Defaults to `300`.  |

**Returns:** void
