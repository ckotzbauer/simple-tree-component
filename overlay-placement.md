
# Overlay placement

This feature is completely independent from the simple-tree-component and can be used standalone.

```js
import { calculate } from "simple-tree-component";

const targetOverlayRect = calculate(elementRect, availableHeight, overlayHeight);
```

Check out the [API docs](globals.md#calculate) for a detailed description how the calculation works.

If you directly want to manipulate the overlay-element with the calculated values, you can use [this](globals.md#calculateOverlayPlacement) function instead:

```js
import { calculateOverlayPlacement } from "simple-tree-component";

calculateOverlayPlacement(overlay, element);
```
