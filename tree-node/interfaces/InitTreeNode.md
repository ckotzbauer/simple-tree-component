[**Simple Tree Component**](../../README.md)

***

[Simple Tree Component](../../modules.md) / [tree-node](../README.md) / InitTreeNode

# Interface: InitTreeNode

Defined in: [tree-node.ts:4](https://github.com/ckotzbauer/simple-tree-component/blob/366081937ab830ecc2456d9b65c4ec62ed608fe9/src/types/tree-node.ts#L4)

The data representation of each node-object in the tree at initialization-time.

## Extended by

- [`TreeNode`](TreeNode.md)

## Indexable

> \[`key`: `string`\]: `any`

Any additional property, which is available (the component-logic will respect them).

## Properties

### children?

> `optional` **children?**: `InitTreeNode`[]

Defined in: [tree-node.ts:30](https://github.com/ckotzbauer/simple-tree-component/blob/366081937ab830ecc2456d9b65c4ec62ed608fe9/src/types/tree-node.ts#L30)

Recursive array of child `TreeNode` objects.

***

### cssClass?

> `optional` **cssClass?**: `string`

Defined in: [tree-node.ts:36](https://github.com/ckotzbauer/simple-tree-component/blob/366081937ab830ecc2456d9b65c4ec62ed608fe9/src/types/tree-node.ts#L36)

Custom css-class added to the line-wrapper element.
(Default: `""`)

***

### draggable?

> `optional` **draggable?**: `boolean`

Defined in: [tree-node.ts:42](https://github.com/ckotzbauer/simple-tree-component/blob/366081937ab830ecc2456d9b65c4ec62ed608fe9/src/types/tree-node.ts#L42)

Indicates if this node is draggable, when dragAndDrop is enabled.
(Default: `true`)

***

### label

> **label**: `string`

Defined in: [tree-node.ts:8](https://github.com/ckotzbauer/simple-tree-component/blob/366081937ab830ecc2456d9b65c4ec62ed608fe9/src/types/tree-node.ts#L8)

The displayed text of this tree-node.

***

### selectable?

> `optional` **selectable?**: `boolean`

Defined in: [tree-node.ts:25](https://github.com/ckotzbauer/simple-tree-component/blob/366081937ab830ecc2456d9b65c4ec62ed608fe9/src/types/tree-node.ts#L25)

Indicates if this node is selectable. Mouse-clicks on the node are avoided if `false`.
Nodes that are not selectable are also ignored when setting via API.
In Recursive Checkbox Mode this flag has no effect since all nodes are selectable there.

***

### selected?

> `optional` **selected?**: `boolean`

Defined in: [tree-node.ts:18](https://github.com/ckotzbauer/simple-tree-component/blob/366081937ab830ecc2456d9b65c4ec62ed608fe9/src/types/tree-node.ts#L18)

Indicates if this node is currently selected and included in the component-value (Instance.getSelected()).

***

### value

> **value**: `string`

Defined in: [tree-node.ts:13](https://github.com/ckotzbauer/simple-tree-component/blob/366081937ab830ecc2456d9b65c4ec62ed608fe9/src/types/tree-node.ts#L13)

The data-value of this tree-node. It has to be unique.
