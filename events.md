
# Events

The library uses a `Subscription` approach to handle events. You can register for a event on a `TreeInstance`.

```js

const subscription = tree.subscribe("selectionChanged", (selected: TreeNode | TreeNode[], event: string) => {
    // do whatever you want
});

// later
subscription.dispose();
```

If you only want to subscribe for a single event and dispose the subscription afterwards automatically, use `subscribeOnce`:

```js

tree.subscribeOnce("selectionChanged", (selected: TreeNode | TreeNode[], event: string) => {
    // do whatever you want
});
```

Currently the `selectionChanged` event is the only official event. There are numerous internal events (prefixed with `_`). Do not use them directly.
