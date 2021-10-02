
# Events

The library uses a `Subscription` approach to handle events. You can register for a event on a `TreeInstance`.

```js

const subscription = tree.subscribe("selectionChanged", (selected: TreeNode | TreeNode[], eventName: string, e?: Event) => {
    // do whatever you want
});

// later
subscription.dispose();
```

If you only want to subscribe for a single event and dispose the subscription afterwards automatically, use `subscribeOnce`:

```js

tree.subscribeOnce("selectionChanged", (selected: TreeNode | TreeNode[], eventName: string, e?: Event) => {
    // do whatever you want
});
```

Currently the only official events are `selectionChanged` and `nodeSelected`. The optional third event-object parameter is only used for the `nodeSelected`
event to allow a event-cancellation with `e.preventDefault()`. This will abort the current event and avoid any changes on the data-layer.
There are numerous internal events (prefixed with `_`). Do not use them directly.
