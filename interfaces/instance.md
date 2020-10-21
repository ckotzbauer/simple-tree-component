# Interface: Instance\<K>

Represents the public api of a tree-instance.

## Type parameters

Name | Type |
------ | ------ |
`K` | keyof [TreeModeNameMap](treemodenamemap.md) |

## Hierarchy

* **Instance**

## Index

### Properties

* [options](instance.md#options)

### Methods

* [destroy](instance.md#destroy)
* [getNode](instance.md#getnode)
* [getSelected](instance.md#getselected)
* [hideEmphasizeIcon](instance.md#hideemphasizeicon)
* [moveNode](instance.md#movenode)
* [setReadOnly](instance.md#setreadonly)
* [setSelected](instance.md#setselected)
* [showEmphasizeIcon](instance.md#showemphasizeicon)
* [subscribe](instance.md#subscribe)
* [subscribeOnce](instance.md#subscribeonce)

## Properties

### options

•  **options**: [BaseOptions](baseoptions.md)

*Defined in [types/instance.ts:18](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/instance.ts#L18)*

Applied configuration options for the current instance.

## Methods

### destroy

▸ **destroy**(): void

*Defined in [types/instance.ts:23](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/instance.ts#L23)*

Destroy the current instance and remove all modifications to the dom.

**Returns:** void

___

### getNode

▸ **getNode**(`value`: string): [TreeNode](treenode.md) \| null

*Defined in [types/instance.ts:31](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/instance.ts#L31)*

Returns a tree-node which has the given `value` as value-property.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | string | of a tree-node which should be returned. |

**Returns:** [TreeNode](treenode.md) \| null

a matching tree-node or null.

___

### getSelected

▸ **getSelected**(): TreeModeNameMap[K]

*Defined in [types/instance.ts:46](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/instance.ts#L46)*

Returns one or multiple selected tree-node objects, depending on the mode.

**Returns:** TreeModeNameMap[K]

a tree-node object in single-mode and view-mode without checkboxes. An array of nodes otherwise.

___

### hideEmphasizeIcon

▸ **hideEmphasizeIcon**(): void

*Defined in [types/instance.ts:72](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/instance.ts#L72)*

Only usable in single-mode. Hides the emphasize-icon again.

**Returns:** void

___

### moveNode

▸ **moveNode**(`value`: [TreeNode](treenode.md) \| string, `direction`: \"up\" \| \"down\"): void

*Defined in [types/instance.ts:39](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/instance.ts#L39)*

Moves the up or down in the same hierarchy-level.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | [TreeNode](treenode.md) \| string | tree-node object to move. |
`direction` | \"up\" \| \"down\" | of move-operation.  |

**Returns:** void

___

### setReadOnly

▸ **setReadOnly**(`readOnly`: boolean): void

*Defined in [types/instance.ts:60](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/instance.ts#L60)*

Changes the read-only state of the tree.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`readOnly` | boolean | state of the tree.  |

**Returns:** void

___

### setSelected

▸ **setSelected**(`value`: TreeModeNameMap[K]): void

*Defined in [types/instance.ts:53](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/instance.ts#L53)*

Resets the selection-state of tree-nodes to the given one(s).

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`value` | TreeModeNameMap[K] | a tree-node object in single-mode and view-mode without checkboxes. An array of nodes otherwise.  |

**Returns:** void

___

### showEmphasizeIcon

▸ **showEmphasizeIcon**(`cssClass`: string): void

*Defined in [types/instance.ts:67](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/instance.ts#L67)*

Only usable in single-mode. Shows an icon for a selected tree-node.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`cssClass` | string | to set on the icon-area.  |

**Returns:** void

___

### subscribe

▸ **subscribe**(`event`: \"selectionChanged\", `handler`: (d: TreeModeNameMap[K], e: string) => void): [Subscription](subscription.md)

*Defined in [types/instance.ts:81](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/instance.ts#L81)*

Add a listener to handle "selectionChanged" events.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`event` | \"selectionChanged\" | "selectionChanged" event |
`handler` | (d: TreeModeNameMap[K], e: string) => void | to execute custom logic on this event. |

**Returns:** [Subscription](subscription.md)

a subscription object to unsubscribe again.

___

### subscribeOnce

▸ **subscribeOnce**(`event`: \"selectionChanged\", `handler`: (d: TreeModeNameMap[K], e: string) => void): [Subscription](subscription.md)

*Defined in [types/instance.ts:90](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/instance.ts#L90)*

Add a listener to handle "selectionChanged" events. When the event is emitted for the first time, the subscription ends automatically.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`event` | \"selectionChanged\" | "selectionChanged" event |
`handler` | (d: TreeModeNameMap[K], e: string) => void | to execute custom logic on this event. |

**Returns:** [Subscription](subscription.md)

a subscription object to unsubscribe again.
