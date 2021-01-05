
# Overlay placement

This feature is completely independent from the simple-tree-component and can be used standalone.

```js
import { calculate } from "simple-tree-component";

const targetOverlayRect = calculate(elementRect, availableHeight, overlayHeight);
```

Check out the [API docs](modules/rects.md#calculate) for a detailed description how the calculation works.

If you directly want to manipulate the overlay-element with the calculated values, you can use [this](modules/rects.md#calculateOverlayPlacement) function instead:

```js
import { calculateOverlayPlacement } from "simple-tree-component";

calculateOverlayPlacement(overlay, element);
```
