[Simple Tree Component](../README.md) / [Modules](../modules.md) / [tree-node](tree_node.md) / InitTreeNode

# Interface: InitTreeNode

[tree-node](tree_node.md).InitTreeNode

The data representation of each node-object in the tree at initialization-time.

## Hierarchy

- **`InitTreeNode`**

  ↳ [`TreeNode`](tree_node.TreeNode.md)

## Indexable

▪ [key: `string`]: `any`

Any additional property, which is available (the component-logic will respect them).

## Table of contents

### Properties

- [children](tree_node.InitTreeNode.md#children)
- [cssClass](tree_node.InitTreeNode.md#cssclass)
- [draggable](tree_node.InitTreeNode.md#draggable)
- [label](tree_node.InitTreeNode.md#label)
- [selectable](tree_node.InitTreeNode.md#selectable)
- [selected](tree_node.InitTreeNode.md#selected)
- [value](tree_node.InitTreeNode.md#value)

## Properties

### children

• `Optional` **children**: [`InitTreeNode`](tree_node.InitTreeNode.md)[]

Recursive array of child `TreeNode` objects.

#### Defined in

[tree-node.ts:30](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L30)

___

### cssClass

• `Optional` **cssClass**: `string`

Custom css-class added to the line-wrapper element.
(Default: `""`)

#### Defined in

[tree-node.ts:36](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L36)

___

### draggable

• `Optional` **draggable**: `boolean`

Indicates if this node is draggable, when dragAndDrop is enabled.
(Default: `true`)

#### Defined in

[tree-node.ts:42](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L42)

___

### label

• **label**: `string`

The displayed text of this tree-node.

#### Defined in

[tree-node.ts:8](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L8)

___

### selectable

• `Optional` **selectable**: `boolean`

Indicates if this node is selectable. Mouse-clicks on the node are avoided if `false`.
Nodes that are not selectable are also ignored when setting via API.
In Recursive Checkbox Mode this flag has no effect since all nodes are selectable there.

#### Defined in

[tree-node.ts:25](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L25)

___

### selected

• `Optional` **selected**: `boolean`

Indicates if this node is currently selected and included in the component-value ({@link Instance.getSelected()}).

#### Defined in

[tree-node.ts:18](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L18)

___

### value

• **value**: `string`

The data-value of this tree-node. It has to be unique.

#### Defined in

[tree-node.ts:13](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L13)
