[Simple Tree Component](../README.md) / [Modules](../modules.md) / [instance](instance.md) / TreeInstance

# Interface: TreeInstance<K\>

[instance](instance.md).TreeInstance

Represents the public api of a tree-instance.

## Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends keyof [`TreeModeNameMap`](instance.TreeModeNameMap.md) |

## Table of contents

### Properties

- [options](instance.TreeInstance.md#options)

### Methods

- [addNode](instance.TreeInstance.md#addnode)
- [deleteNode](instance.TreeInstance.md#deletenode)
- [destroy](instance.TreeInstance.md#destroy)
- [getNode](instance.TreeInstance.md#getnode)
- [getSelected](instance.TreeInstance.md#getselected)
- [hideEmphasizeIcon](instance.TreeInstance.md#hideemphasizeicon)
- [moveNode](instance.TreeInstance.md#movenode)
- [setReadOnly](instance.TreeInstance.md#setreadonly)
- [setSelected](instance.TreeInstance.md#setselected)
- [showEmphasizeIcon](instance.TreeInstance.md#showemphasizeicon)
- [subscribe](instance.TreeInstance.md#subscribe)
- [subscribeOnce](instance.TreeInstance.md#subscribeonce)
- [updateNodeLabel](instance.TreeInstance.md#updatenodelabel)

## Properties

### options

• **options**: [`BaseOptions`](options.BaseOptions.md)

Applied configuration options for the current instance.

#### Defined in

[instance.ts:18](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L18)

## Methods

### addNode

▸ **addNode**(`node`, `parent`): `void`

Adds a new node to the tree with a optional parent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`TreeNode`](tree_node.TreeNode.md) | to add. |
| `parent` | ``null`` \| `string` \| [`TreeNode`](tree_node.TreeNode.md) | of the new tree-node or null |

#### Returns

`void`

#### Defined in

[instance.ts:39](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L39)

___

### deleteNode

▸ **deleteNode**(`node`): `void`

Deletes the given tree-node from the tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`TreeNode`](tree_node.TreeNode.md) | to delete. |

#### Returns

`void`

#### Defined in

[instance.ts:46](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L46)

___

### destroy

▸ **destroy**(): `void`

Destroy the current instance and remove all modifications to the dom.

#### Returns

`void`

#### Defined in

[instance.ts:23](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L23)

___

### getNode

▸ **getNode**(`value`): ``null`` \| [`TreeNode`](tree_node.TreeNode.md)

Returns a tree-node which has the given `value` as value-property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | of a tree-node which should be returned. |

#### Returns

``null`` \| [`TreeNode`](tree_node.TreeNode.md)

a matching tree-node or null.

#### Defined in

[instance.ts:31](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L31)

___

### getSelected

▸ **getSelected**(): [`TreeModeNameMap`](instance.TreeModeNameMap.md)[`K`]

Returns one or multiple selected tree-node objects, depending on the mode.

#### Returns

[`TreeModeNameMap`](instance.TreeModeNameMap.md)[`K`]

a tree-node object in single-mode and view-mode without checkboxes. An array of nodes otherwise.

#### Defined in

[instance.ts:69](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L69)

___

### hideEmphasizeIcon

▸ **hideEmphasizeIcon**(): `void`

Only usable in single-mode. Hides the emphasize-icon again.

#### Returns

`void`

#### Defined in

[instance.ts:95](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L95)

___

### moveNode

▸ **moveNode**(`value`, `direction`): `void`

Moves the up or down in the same hierarchy-level.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` \| [`TreeNode`](tree_node.TreeNode.md) | tree-node object to move. |
| `direction` | ``"up"`` \| ``"down"`` | of move-operation. |

#### Returns

`void`

#### Defined in

[instance.ts:62](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L62)

___

### setReadOnly

▸ **setReadOnly**(`readOnly`): `void`

Changes the read-only state of the tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `readOnly` | `boolean` | state of the tree. |

#### Returns

`void`

#### Defined in

[instance.ts:83](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L83)

___

### setSelected

▸ **setSelected**(`value`): `void`

Resets the selection-state of tree-nodes to the given one(s).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`TreeModeNameMap`](instance.TreeModeNameMap.md)[`K`] | a tree-node object in single-mode and view-mode without checkboxes. An array of nodes otherwise. |

#### Returns

`void`

#### Defined in

[instance.ts:76](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L76)

___

### showEmphasizeIcon

▸ **showEmphasizeIcon**(`cssClass`): `void`

Only usable in single-mode. Shows an icon for a selected tree-node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cssClass` | `string` | to set on the icon-area. |

#### Returns

`void`

#### Defined in

[instance.ts:90](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L90)

___

### subscribe

▸ **subscribe**(`event`, `handler`): [`Subscription`](subscription.Subscription.md)

Add a listener to handle "selectionChanged" or "selectionChanging" events.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"selectionChanged"`` | "selectionChanged" or "selectionChanging" event |
| `handler` | (`d`: [`TreeModeNameMap`](instance.TreeModeNameMap.md)[`K`], `evt`: `string`, `e?`: `Event`) => `void` | to execute custom logic on this event. |

#### Returns

[`Subscription`](subscription.Subscription.md)

a subscription object to unsubscribe again.

#### Defined in

[instance.ts:104](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L104)

▸ **subscribe**(`event`, `handler`): [`Subscription`](subscription.Subscription.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"selectionChanging"`` |
| `handler` | (`d`: [`TreeModeNameMap`](instance.TreeModeNameMap.md)[`K`], `evt`: `string`, `e?`: `Event`) => `void` |

#### Returns

[`Subscription`](subscription.Subscription.md)

#### Defined in

[instance.ts:105](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L105)

___

### subscribeOnce

▸ **subscribeOnce**(`event`, `handler`): [`Subscription`](subscription.Subscription.md)

Add a listener to handle "selectionChanged" or "selectionChanging" events. When the event is emitted for the first time, the subscription ends automatically.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"selectionChanged"`` | "selectionChanged" or "selectionChanging" event |
| `handler` | (`d`: [`TreeModeNameMap`](instance.TreeModeNameMap.md)[`K`], `evt`: `string`, `e?`: `Event`) => `void` | to execute custom logic on this event. |

#### Returns

[`Subscription`](subscription.Subscription.md)

a subscription object to unsubscribe again.

#### Defined in

[instance.ts:114](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L114)

▸ **subscribeOnce**(`event`, `handler`): [`Subscription`](subscription.Subscription.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"selectionChanging"`` |
| `handler` | (`d`: [`TreeModeNameMap`](instance.TreeModeNameMap.md)[`K`], `evt`: `string`, `e?`: `Event`) => `void` |

#### Returns

[`Subscription`](subscription.Subscription.md)

#### Defined in

[instance.ts:115](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L115)

___

### updateNodeLabel

▸ **updateNodeLabel**(`node`, `newLabel`): `void`

Updates the display-text of the given tree-node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | [`TreeNode`](tree_node.TreeNode.md) | to update. |
| `newLabel` | `string` | - |

#### Returns

`void`

#### Defined in

[instance.ts:54](https://github.com/ckotzbauer/simple-tree-component/blob/e64bd84/src/types/instance.ts#L54)
