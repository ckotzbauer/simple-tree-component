[**Simple Tree Component**](../../README.md)

***

[Simple Tree Component](../../modules.md) / [rects](../README.md) / calculateOverlayPlacement

# Function: calculateOverlayPlacement()

> **calculateOverlayPlacement**(`overlay`, `element`, `maxHeight?`): `void`

Defined in: [rects.ts:56](https://github.com/ckotzbauer/simple-tree-component/blob/baddc1f43d7297f30d3a97c9c1312c11fa27364b/src/types/rects.ts#L56)

Calculates the position of the `overlay` relative to the `element` and sets the values accordingly.
See the docs of the `calculate` function for more details.

## Parameters

### overlay

`HTMLElement`

The HTML element of the overlay, which should be placed correctly.

### element

`HTMLElement`

The HTML element to which the `overlay` belongs.

### maxHeight?

`number`

The maximum height of the overlay. Defaults to `300`.

## Returns

`void`
