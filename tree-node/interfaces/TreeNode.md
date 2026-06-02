[**Simple Tree Component**](../../README.md)

***

[Simple Tree Component](../../modules.md) / [tree-node](../README.md) / TreeNode

# Interface: TreeNode

Defined in: [tree-node.ts:53](https://github.com/ckotzbauer/simple-tree-component/blob/df304190bf97955ce6e5b8bf742932082cb00f91/src/types/tree-node.ts#L53)

The data representation of each node-object in the tree.

## Extends

- [`InitTreeNode`](InitTreeNode.md)

## Indexable

> \[`key`: `string`\]: `any`

Any additional property, which is available (the component-logic will respect them).

## Properties

### children

> **children**: `TreeNode`[]

Defined in: [tree-node.ts:69](https://github.com/ckotzbauer/simple-tree-component/blob/df304190bf97955ce6e5b8bf742932082cb00f91/src/types/tree-node.ts#L69)

Recursive array of child `TreeNode` objects.

#### Overrides

[`InitTreeNode`](InitTreeNode.md).[`children`](InitTreeNode.md#children)

***

### collapsed

> **collapsed**: `boolean`

Defined in: [tree-node.ts:86](https://github.com/ckotzbauer/simple-tree-component/blob/df304190bf97955ce6e5b8bf742932082cb00f91/src/types/tree-node.ts#L86)

Indicates if this node (in case it has child-nodes) is currently collapsed.

***

### cssClass

> **cssClass**: `string`

Defined in: [tree-node.ts:75](https://github.com/ckotzbauer/simple-tree-component/blob/df304190bf97955ce6e5b8bf742932082cb00f91/src/types/tree-node.ts#L75)

Custom css-class added to the line-wrapper element.
(Default: `""`)

#### Overrides

[`InitTreeNode`](InitTreeNode.md).[`cssClass`](InitTreeNode.md#cssclass)

***

### draggable

> **draggable**: `boolean`

Defined in: [tree-node.ts:81](https://github.com/ckotzbauer/simple-tree-component/blob/df304190bf97955ce6e5b8bf742932082cb00f91/src/types/tree-node.ts#L81)

Indicates if this node is draggable, when dragAndDrop is enabled.
(Default: `true`)

#### Overrides

[`InitTreeNode`](InitTreeNode.md).[`draggable`](InitTreeNode.md#draggable)

***

### hidden

> **hidden**: `boolean`

Defined in: [tree-node.ts:91](https://github.com/ckotzbauer/simple-tree-component/blob/df304190bf97955ce6e5b8bf742932082cb00f91/src/types/tree-node.ts#L91)

Indicates if this node is visible in the tree.

***

### label

> **label**: `string`

Defined in: [tree-node.ts:8](https://github.com/ckotzbauer/simple-tree-component/blob/df304190bf97955ce6e5b8bf742932082cb00f91/src/types/tree-node.ts#L8)

The displayed text of this tree-node.

#### Inherited from

[`InitTreeNode`](InitTreeNode.md).[`label`](InitTreeNode.md#label)

***

### selectable

> **selectable**: `boolean`

Defined in: [tree-node.ts:64](https://github.com/ckotzbauer/simple-tree-component/blob/df304190bf97955ce6e5b8bf742932082cb00f91/src/types/tree-node.ts#L64)

Indicates if this node is selectable. Mouse-clicks on the node are avoided if `false`.
Nodes that are not selectable are also ignored when setting via API.
In Recursive Checkbox Mode this flag has no effect since all nodes are selectable there.

#### Overrides

[`InitTreeNode`](InitTreeNode.md).[`selectable`](InitTreeNode.md#selectable)

***

### selected

> **selected**: `boolean`

Defined in: [tree-node.ts:57](https://github.com/ckotzbauer/simple-tree-component/blob/df304190bf97955ce6e5b8bf742932082cb00f91/src/types/tree-node.ts#L57)

Indicates if this node is currently selected and included in the component-value (Instance.getSelected()).

#### Overrides

[`InitTreeNode`](InitTreeNode.md).[`selected`](InitTreeNode.md#selected)

***

### uid

> **uid**: `string`

Defined in: [tree-node.ts:96](https://github.com/ckotzbauer/simple-tree-component/blob/df304190bf97955ce6e5b8bf742932082cb00f91/src/types/tree-node.ts#L96)

The unique id-value used internally.

***

### value

> **value**: `string`

Defined in: [tree-node.ts:13](https://github.com/ckotzbauer/simple-tree-component/blob/df304190bf97955ce6e5b8bf742932082cb00f91/src/types/tree-node.ts#L13)

The data-value of this tree-node. It has to be unique.

#### Inherited from

[`InitTreeNode`](InitTreeNode.md).[`value`](InitTreeNode.md#value)
