
# Tree mode

<p align="center">
  <img src="assets/tree-view.png">
</p>

## Features

In addition to the general, self-explanatory features, this mode also offers support for the following options:

### Checkboxes

The checkbox-feature is disabled by default. Then only one item can be selected. Checkboxes enable support for multi-selections.

```js
checkboxes: {
    active: true
}
```

All items are now selectable completely independent from each other. So selections of parent-nodes have no effect to their childs. This can be changed, when enabling
[recursive-selection](interfaces/options.baseoptions.md#checkboxes):

```js
checkboxes: {
    active: true,
    recursive: true
}
```

With recursion enabled, a parent automatically select its childs. A parent is only selected, if all childs are selected too. If the state of one child changes,
the parent is deselected too.


### Drag & Drop

The drag&drop-feature is disabled by default. When enabled, all nodes whose `draggable` flag is not false (true by default) can be reordered.
It is only possible to drag&drop on the same hierarchy-level, parent-changes are therefore not allowed. Currently there is no
support for cancelling a specific (already started) drag-action.

```js
dragAndDrop: true
```

The native "drop" event is fired as component-event `nodeIndexChanged`:

```js
tree.subscribe("nodeIndexChanged", (payload: { node: TreeNode, newIndex: number }) => {
    // handle the index-change in any way you want.
});
```


## Live demo

Try this [JSFiddle](https://jsfiddle.net/zn1qwjb9/4/).
