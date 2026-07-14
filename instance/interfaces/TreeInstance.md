[**Simple Tree Component**](../../README.md)

***

[Simple Tree Component](../../modules.md) / [instance](../README.md) / TreeInstance

# Interface: TreeInstance\<K\>

Defined in: [instance.ts:14](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L14)

Represents the public api of a tree-instance.

## Type Parameters

### K

`K` *extends* keyof [`TreeModeNameMap`](TreeModeNameMap.md)

## Properties

### options

> **options**: [`BaseOptions`](../../options/interfaces/BaseOptions.md)

Defined in: [instance.ts:18](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L18)

Applied configuration options for the current instance.

## Methods

### addNode()

> **addNode**(`node`, `parent?`): `void`

Defined in: [instance.ts:39](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L39)

Adds a new node to the tree with a optional parent.

#### Parameters

##### node

[`InitTreeNode`](../../tree-node/interfaces/InitTreeNode.md)

to add.

##### parent?

`string` \| [`TreeNode`](../../tree-node/interfaces/TreeNode.md) \| `null`

of the new tree-node or null

#### Returns

`void`

***

### collapseAllNodes()

> **collapseAllNodes**(): `void`

Defined in: [instance.ts:107](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L107)

Collapse all nodes in the tree.

#### Returns

`void`

***

### collapseNode()

> **collapseNode**(`node`): `void`

Defined in: [instance.ts:117](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L117)

Collapse a specific node in the tree. Does nothing if the node does not exist or is invisible.

#### Parameters

##### node

[`TreeNode`](../../tree-node/interfaces/TreeNode.md)

#### Returns

`void`

***

### deleteNode()

> **deleteNode**(`node`): `void`

Defined in: [instance.ts:46](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L46)

Deletes the given tree-node from the tree.

#### Parameters

##### node

[`TreeNode`](../../tree-node/interfaces/TreeNode.md)

to delete.

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Defined in: [instance.ts:23](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L23)

Destroy the current instance and remove all modifications to the dom.

#### Returns

`void`

***

### expandAllNodes()

> **expandAllNodes**(): `void`

Defined in: [instance.ts:112](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L112)

Expand all nodes in the tree.

#### Returns

`void`

***

### expandNode()

> **expandNode**(`node`): `void`

Defined in: [instance.ts:122](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L122)

Expand a specific node in the tree. Does nothing if the node does not exist or is invisible.

#### Parameters

##### node

[`TreeNode`](../../tree-node/interfaces/TreeNode.md)

#### Returns

`void`

***

### getNode()

> **getNode**(`value`): [`TreeNode`](../../tree-node/interfaces/TreeNode.md) \| `null`

Defined in: [instance.ts:31](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L31)

Returns a tree-node which has the given `value` as value-property.

#### Parameters

##### value

`string`

of a tree-node which should be returned.

#### Returns

[`TreeNode`](../../tree-node/interfaces/TreeNode.md) \| `null`

a matching tree-node or null.

***

### getSelected()

> **getSelected**(): [`TreeModeNameMap`](TreeModeNameMap.md)\[`K`\]

Defined in: [instance.ts:76](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L76)

Returns one or multiple selected tree-node objects, depending on the mode.

#### Returns

[`TreeModeNameMap`](TreeModeNameMap.md)\[`K`\]

a tree-node object in single-mode and view-mode without checkboxes. An array of nodes otherwise.

***

### hideEmphasizeIcon()

> **hideEmphasizeIcon**(): `void`

Defined in: [instance.ts:102](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L102)

Only usable in single-mode. Hides the emphasize-icon again.

#### Returns

`void`

***

### moveNode()

> **moveNode**(`value`, `direction`): `void`

Defined in: [instance.ts:69](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L69)

Moves the up or down in the same hierarchy-level.

#### Parameters

##### value

`string` \| [`TreeNode`](../../tree-node/interfaces/TreeNode.md)

tree-node object to move.

##### direction

`"up"` \| `"down"`

of move-operation.

#### Returns

`void`

***

### setNodes()

> **setNodes**(`nodes`): `void`

Defined in: [instance.ts:53](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L53)

Replaces all nodes with the given ones.

#### Parameters

##### nodes

[`InitTreeNode`](../../tree-node/interfaces/InitTreeNode.md)[]

to set.

#### Returns

`void`

***

### setReadOnly()

> **setReadOnly**(`readOnly`): `void`

Defined in: [instance.ts:90](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L90)

Changes the read-only state of the tree.

#### Parameters

##### readOnly

`boolean`

state of the tree.

#### Returns

`void`

***

### setSelected()

> **setSelected**(`value`): `void`

Defined in: [instance.ts:83](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L83)

Resets the selection-state of tree-nodes to the given one(s).

#### Parameters

##### value

[`TreeModeNameMap`](TreeModeNameMap.md)\[`K`\]

a tree-node object in single-mode and view-mode without checkboxes. An array of nodes otherwise.

#### Returns

`void`

***

### showEmphasizeIcon()

> **showEmphasizeIcon**(`cssClass`): `void`

Defined in: [instance.ts:97](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L97)

Only usable in single-mode. Shows an icon for a selected tree-node.

#### Parameters

##### cssClass

`string`

to set on the icon-area.

#### Returns

`void`

***

### subscribe()

#### Call Signature

> **subscribe**(`event`, `handler`): [`Subscription`](../../subscription/interfaces/Subscription.md)

Defined in: [instance.ts:136](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L136)

Add a listener to handle "selectionChanged", "selectionChanging" or "nodeIndexChanged" events.

##### Parameters

###### event

`"selectionChanged"`

"selectionChanged", "selectionChanging" or "nodeIndexChanged" event

###### handler

(`d`, `evt`, `e?`) => `void`

to execute custom logic on this event.

##### Returns

[`Subscription`](../../subscription/interfaces/Subscription.md)

a subscription object to unsubscribe again.

#### Call Signature

> **subscribe**(`event`, `handler`): [`Subscription`](../../subscription/interfaces/Subscription.md)

Defined in: [instance.ts:137](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L137)

##### Parameters

###### event

`"selectionChanging"`

###### handler

(`d`, `evt`, `e?`) => `void`

##### Returns

[`Subscription`](../../subscription/interfaces/Subscription.md)

#### Call Signature

> **subscribe**(`event`, `handler`): [`Subscription`](../../subscription/interfaces/Subscription.md)

Defined in: [instance.ts:138](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L138)

##### Parameters

###### event

`"nodeIndexChanged"`

###### handler

(`d`, `evt`, `e?`) => `void`

##### Returns

[`Subscription`](../../subscription/interfaces/Subscription.md)

***

### subscribeOnce()

#### Call Signature

> **subscribeOnce**(`event`, `handler`): [`Subscription`](../../subscription/interfaces/Subscription.md)

Defined in: [instance.ts:150](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L150)

Add a listener to handle "selectionChanged" "selectionChanging" or "nodeIndexChanged" events. When the event is emitted for the first time, the subscription ends automatically.

##### Parameters

###### event

`"selectionChanged"`

"selectionChanged", "selectionChanging" or "nodeIndexChanged" event

###### handler

(`d`, `evt`, `e?`) => `void`

to execute custom logic on this event.

##### Returns

[`Subscription`](../../subscription/interfaces/Subscription.md)

a subscription object to unsubscribe again.

#### Call Signature

> **subscribeOnce**(`event`, `handler`): [`Subscription`](../../subscription/interfaces/Subscription.md)

Defined in: [instance.ts:151](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L151)

##### Parameters

###### event

`"selectionChanging"`

###### handler

(`d`, `evt`, `e?`) => `void`

##### Returns

[`Subscription`](../../subscription/interfaces/Subscription.md)

#### Call Signature

> **subscribeOnce**(`event`, `handler`): [`Subscription`](../../subscription/interfaces/Subscription.md)

Defined in: [instance.ts:152](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L152)

##### Parameters

###### event

`"nodeIndexChanged"`

###### handler

(`d`, `evt`, `e?`) => `void`

##### Returns

[`Subscription`](../../subscription/interfaces/Subscription.md)

***

### toggleCollapseNode()

> **toggleCollapseNode**(`node`): `void`

Defined in: [instance.ts:127](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L127)

Collapses or expands a specific node in the tree. Does nothing if the node does not exist or is invisible.

#### Parameters

##### node

[`TreeNode`](../../tree-node/interfaces/TreeNode.md)

#### Returns

`void`

***

### updateNodeLabel()

> **updateNodeLabel**(`node`, `newLabel`): `void`

Defined in: [instance.ts:61](https://github.com/ckotzbauer/simple-tree-component/blob/994f1ba8a9fb0016612d58ea92d8b1cac6c90769/src/types/instance.ts#L61)

Updates the display-text of the given tree-node.

#### Parameters

##### node

[`TreeNode`](../../tree-node/interfaces/TreeNode.md)

to update.

##### newLabel

`string`

#### Returns

`void`
