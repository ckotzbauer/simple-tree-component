[Simple Tree Component](../README.md) / [Modules](../modules.md) / [tree-node](tree_node.md) / TreeNode

# Interface: TreeNode

[tree-node](tree_node.md).TreeNode

The data representation of each node-object in the tree.

## Hierarchy

- [`InitTreeNode`](tree_node.InitTreeNode.md)

  ↳ **`TreeNode`**

## Table of contents

### Properties

- [children](tree_node.TreeNode.md#children)
- [collapsed](tree_node.TreeNode.md#collapsed)
- [cssClass](tree_node.TreeNode.md#cssclass)
- [draggable](tree_node.TreeNode.md#draggable)
- [hidden](tree_node.TreeNode.md#hidden)
- [label](tree_node.TreeNode.md#label)
- [selectable](tree_node.TreeNode.md#selectable)
- [selected](tree_node.TreeNode.md#selected)
- [uid](tree_node.TreeNode.md#uid)
- [value](tree_node.TreeNode.md#value)

## Properties

### children

• **children**: [`TreeNode`](tree_node.TreeNode.md)[]

Recursive array of child `TreeNode` objects.

#### Overrides

[InitTreeNode](tree_node.InitTreeNode.md).[children](tree_node.InitTreeNode.md#children)

#### Defined in

[tree-node.ts:69](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L69)

___

### collapsed

• **collapsed**: `boolean`

Indicates if this node (in case it has child-nodes) is currently collapsed.

#### Defined in

[tree-node.ts:86](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L86)

___

### cssClass

• **cssClass**: `string`

Custom css-class added to the line-wrapper element.
(Default: `""`)

#### Overrides

[InitTreeNode](tree_node.InitTreeNode.md).[cssClass](tree_node.InitTreeNode.md#cssclass)

#### Defined in

[tree-node.ts:75](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L75)

___

### draggable

• **draggable**: `boolean`

Indicates if this node is draggable, when dragAndDrop is enabled.
(Default: `true`)

#### Overrides

[InitTreeNode](tree_node.InitTreeNode.md).[draggable](tree_node.InitTreeNode.md#draggable)

#### Defined in

[tree-node.ts:81](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L81)

___

### hidden

• **hidden**: `boolean`

Indicates if this node is visible in the tree.

#### Defined in

[tree-node.ts:91](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L91)

___

### label

• **label**: `string`

The displayed text of this tree-node.

#### Inherited from

[InitTreeNode](tree_node.InitTreeNode.md).[label](tree_node.InitTreeNode.md#label)

#### Defined in

[tree-node.ts:8](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L8)

___

### selectable

• **selectable**: `boolean`

Indicates if this node is selectable. Mouse-clicks on the node are avoided if `false`.
Nodes that are not selectable are also ignored when setting via API.
In Recursive Checkbox Mode this flag has no effect since all nodes are selectable there.

#### Overrides

[InitTreeNode](tree_node.InitTreeNode.md).[selectable](tree_node.InitTreeNode.md#selectable)

#### Defined in

[tree-node.ts:64](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L64)

___

### selected

• **selected**: `boolean`

Indicates if this node is currently selected and included in the component-value ({@link Instance.getSelected()}).

#### Overrides

[InitTreeNode](tree_node.InitTreeNode.md).[selected](tree_node.InitTreeNode.md#selected)

#### Defined in

[tree-node.ts:57](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L57)

___

### uid

• **uid**: `string`

The unique id-value used internally.

#### Defined in

[tree-node.ts:96](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L96)

___

### value

• **value**: `string`

The data-value of this tree-node. It has to be unique.

#### Inherited from

[InitTreeNode](tree_node.InitTreeNode.md).[value](tree_node.InitTreeNode.md#value)

#### Defined in

[tree-node.ts:13](https://github.com/ckotzbauer/simple-tree-component/blob/ad6211e/src/types/tree-node.ts#L13)
