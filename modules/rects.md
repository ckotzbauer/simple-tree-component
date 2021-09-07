# Module: rects

## Table of contents

### Interfaces

- [Rect](../interfaces/rects.rect.md)

### Functions

- [calculate](rects.md#calculate)
- [calculateOverlayPlacement](rects.md#calculateoverlayplacement)

## Functions

### calculate

▸ **calculate**(`elementRect`, `availableHeight`, `overlayHeight`, `borderWith?`, `maxOverlayHeight?`): [`Rect`](../interfaces/rects.rect.md)

Calculates a rectangle to display a overlay-flyout relative to the position of the given `elementRect`.
The following strategy is used (in order):
  1. The overlay can be placed with its `overlayHeight` below of the `elementRect` without exceeding the `availableHeight`.
  2. The overlay can be placed with its `overlayHeight` above of the `elementRect` with a top greater `0`.
  3. The overlay is placed below of the `elementRect` with a reduced height to fit into `availableHeight`.

It is assumed, that the width of the overlay is the same as of the `elementRect`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `elementRect` | [`Rect`](../interfaces/rects.rect.md) | The rectangle of the element this calculation belongs to. (e.g. rectangle of the selectbox for which the position of the flyout should be calculated.) |
| `availableHeight` | `number` | Full height of the surrounding container (e.g. window height) |
| `overlayHeight` | `number` | The height of the overlay which should be positioned. |
| `borderWith?` | `number` | The border-width used. It is assumed, that all borders have the same width. Defaults to `0` |
| `maxOverlayHeight?` | `number` | The maximum height of the overlay. Defaults to `300`. |

#### Returns

[`Rect`](../interfaces/rects.rect.md)

The calculated rectangle of the overlay position.

#### Defined in

[rects.ts:40](https://github.com/ckotzbauer/simple-tree-component/blob/0d16ad4/src/types/rects.ts#L40)

___

### calculateOverlayPlacement

▸ **calculateOverlayPlacement**(`overlay`, `element`, `maxHeight?`): `void`

Calculates the position of the `overlay` relative to the `element` and sets the values accordingly.
See the docs of the `calculate` function for more details.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `overlay` | `HTMLElement` | The HTML element of the overlay, which should be placed correctly. |
| `element` | `HTMLElement` | The HTML element to which the `overlay` belongs. |
| `maxHeight?` | `number` | The maximum height of the overlay. Defaults to `300`. |

#### Returns

`void`

#### Defined in

[rects.ts:56](https://github.com/ckotzbauer/simple-tree-component/blob/0d16ad4/src/types/rects.ts#L56)
