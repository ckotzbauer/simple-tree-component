# Interface: TreeInstance<K\>

[instance](../modules/instance.md).TreeInstance

Represents the public api of a tree-instance.

## Type parameters

Name | Type |
:------ | :------ |
`K` | keyof [*TreeModeNameMap*](instance.treemodenamemap.md) |

## Table of contents

### Properties

- [options](instance.treeinstance.md#options)

### Methods

- [addNode](instance.treeinstance.md#addnode)
- [deleteNode](instance.treeinstance.md#deletenode)
- [destroy](instance.treeinstance.md#destroy)
- [getNode](instance.treeinstance.md#getnode)
- [getSelected](instance.treeinstance.md#getselected)
- [hideEmphasizeIcon](instance.treeinstance.md#hideemphasizeicon)
- [moveNode](instance.treeinstance.md#movenode)
- [setReadOnly](instance.treeinstance.md#setreadonly)
- [setSelected](instance.treeinstance.md#setselected)
- [showEmphasizeIcon](instance.treeinstance.md#showemphasizeicon)
- [subscribe](instance.treeinstance.md#subscribe)
- [subscribeOnce](instance.treeinstance.md#subscribeonce)
- [updateNodeLabel](instance.treeinstance.md#updatenodelabel)

## Properties

### options

• **options**: [*BaseOptions*](options.baseoptions.md)

Applied configuration options for the current instance.

Defined in: [instance.ts:18](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L18)

## Methods

### addNode

▸ **addNode**(`node`: [*TreeNode*](tree_node.treenode.md), `parent`: *null* \| *string* \| [*TreeNode*](tree_node.treenode.md)): *void*

Adds a new node to the tree with a optional parent.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`node` | [*TreeNode*](tree_node.treenode.md) | to add.   |
`parent` | *null* \| *string* \| [*TreeNode*](tree_node.treenode.md) | of the new tree-node or null    |

**Returns:** *void*

Defined in: [instance.ts:39](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L39)

___

### deleteNode

▸ **deleteNode**(`node`: [*TreeNode*](tree_node.treenode.md)): *void*

Deletes the given tree-node from the tree.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`node` | [*TreeNode*](tree_node.treenode.md) | to delete.    |

**Returns:** *void*

Defined in: [instance.ts:46](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L46)

___

### destroy

▸ **destroy**(): *void*

Destroy the current instance and remove all modifications to the dom.

**Returns:** *void*

Defined in: [instance.ts:23](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L23)

___

### getNode

▸ **getNode**(`value`: *string*): *null* \| [*TreeNode*](tree_node.treenode.md)

Returns a tree-node which has the given `value` as value-property.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | *string* | of a tree-node which should be returned.   |

**Returns:** *null* \| [*TreeNode*](tree_node.treenode.md)

a matching tree-node or null.

Defined in: [instance.ts:31](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L31)

___

### getSelected

▸ **getSelected**(): [*TreeModeNameMap*](instance.treemodenamemap.md)[K]

Returns one or multiple selected tree-node objects, depending on the mode.

**Returns:** [*TreeModeNameMap*](instance.treemodenamemap.md)[K]

a tree-node object in single-mode and view-mode without checkboxes. An array of nodes otherwise.

Defined in: [instance.ts:69](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L69)

___

### hideEmphasizeIcon

▸ **hideEmphasizeIcon**(): *void*

Only usable in single-mode. Hides the emphasize-icon again.

**Returns:** *void*

Defined in: [instance.ts:95](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L95)

___

### moveNode

▸ **moveNode**(`value`: *string* \| [*TreeNode*](tree_node.treenode.md), `direction`: *up* \| *down*): *void*

Moves the up or down in the same hierarchy-level.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | *string* \| [*TreeNode*](tree_node.treenode.md) | tree-node object to move.   |
`direction` | *up* \| *down* | of move-operation.    |

**Returns:** *void*

Defined in: [instance.ts:62](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L62)

___

### setReadOnly

▸ **setReadOnly**(`readOnly`: *boolean*): *void*

Changes the read-only state of the tree.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`readOnly` | *boolean* | state of the tree.    |

**Returns:** *void*

Defined in: [instance.ts:83](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L83)

___

### setSelected

▸ **setSelected**(`value`: [*TreeModeNameMap*](instance.treemodenamemap.md)[K]): *void*

Resets the selection-state of tree-nodes to the given one(s).

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | [*TreeModeNameMap*](instance.treemodenamemap.md)[K] | a tree-node object in single-mode and view-mode without checkboxes. An array of nodes otherwise.    |

**Returns:** *void*

Defined in: [instance.ts:76](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L76)

___

### showEmphasizeIcon

▸ **showEmphasizeIcon**(`cssClass`: *string*): *void*

Only usable in single-mode. Shows an icon for a selected tree-node.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`cssClass` | *string* | to set on the icon-area.    |

**Returns:** *void*

Defined in: [instance.ts:90](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L90)

___

### subscribe

▸ **subscribe**(`event`: *selectionChanged*, `handler`: (`d`: [*TreeModeNameMap*](instance.treemodenamemap.md)[K], `e`: *string*) => *void*): [*Subscription*](subscription.subscription-1.md)

Add a listener to handle "selectionChanged" events.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`event` | *selectionChanged* | "selectionChanged" event   |
`handler` | (`d`: [*TreeModeNameMap*](instance.treemodenamemap.md)[K], `e`: *string*) => *void* | to execute custom logic on this event.   |

**Returns:** [*Subscription*](subscription.subscription-1.md)

a subscription object to unsubscribe again.

Defined in: [instance.ts:104](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L104)

___

### subscribeOnce

▸ **subscribeOnce**(`event`: *selectionChanged*, `handler`: (`d`: [*TreeModeNameMap*](instance.treemodenamemap.md)[K], `e`: *string*) => *void*): [*Subscription*](subscription.subscription-1.md)

Add a listener to handle "selectionChanged" events. When the event is emitted for the first time, the subscription ends automatically.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`event` | *selectionChanged* | "selectionChanged" event   |
`handler` | (`d`: [*TreeModeNameMap*](instance.treemodenamemap.md)[K], `e`: *string*) => *void* | to execute custom logic on this event.   |

**Returns:** [*Subscription*](subscription.subscription-1.md)

a subscription object to unsubscribe again.

Defined in: [instance.ts:113](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L113)

___

### updateNodeLabel

▸ **updateNodeLabel**(`node`: [*TreeNode*](tree_node.treenode.md), `newLabel`: *string*): *void*

Updates the display-text of the given tree-node.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`node` | [*TreeNode*](tree_node.treenode.md) | to update.   |
`newLabel` | *string* | - |

**Returns:** *void*

Defined in: [instance.ts:54](https://github.com/ckotzbauer/simple-tree-component/blob/8798469/src/types/instance.ts#L54)
