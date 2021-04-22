# Interface: TreeNode

[tree-node](../modules/tree_node.md).TreeNode

The data representation of each node-object in the tree.

## Table of contents

### Properties

- [children](tree_node.treenode.md#children)
- [collapsed](tree_node.treenode.md#collapsed)
- [hidden](tree_node.treenode.md#hidden)
- [label](tree_node.treenode.md#label)
- [selectable](tree_node.treenode.md#selectable)
- [selected](tree_node.treenode.md#selected)
- [uid](tree_node.treenode.md#uid)
- [value](tree_node.treenode.md#value)

## Properties

### children

• **children**: [*TreeNode*](tree_node.treenode.md)[]

Recursive array of child `TreeNode` objects.

Defined in: [tree-node.ts:30](https://github.com/ckotzbauer/simple-tree-component/blob/a370806/src/types/tree-node.ts#L30)

___

### collapsed

• **collapsed**: *boolean*

Indicates if this node (in case it has child-nodes) is currently collapsed.

Defined in: [tree-node.ts:35](https://github.com/ckotzbauer/simple-tree-component/blob/a370806/src/types/tree-node.ts#L35)

___

### hidden

• **hidden**: *boolean*

Indicates if this node is visible in the tree.

Defined in: [tree-node.ts:40](https://github.com/ckotzbauer/simple-tree-component/blob/a370806/src/types/tree-node.ts#L40)

___

### label

• **label**: *string*

The displayed text of this tree-node.

Defined in: [tree-node.ts:8](https://github.com/ckotzbauer/simple-tree-component/blob/a370806/src/types/tree-node.ts#L8)

___

### selectable

• **selectable**: *boolean*

Indicates if this node is selectable. Mouse-clicks on the node are avoided if `false`.
Nodes that are not selectable are also ignored when setting via API.
In Recursive Checkbox Mode this flag has no effect since all nodes are selectable there.

Defined in: [tree-node.ts:25](https://github.com/ckotzbauer/simple-tree-component/blob/a370806/src/types/tree-node.ts#L25)

___

### selected

• **selected**: *boolean*

Indicates if this node is currently selected and included in the component-value ({@link Instance.getSelected()}).

Defined in: [tree-node.ts:18](https://github.com/ckotzbauer/simple-tree-component/blob/a370806/src/types/tree-node.ts#L18)

___

### uid

• **uid**: *string*

The unique id-value used internally.

Defined in: [tree-node.ts:45](https://github.com/ckotzbauer/simple-tree-component/blob/a370806/src/types/tree-node.ts#L45)

___

### value

• **value**: *string*

The data-value of this tree-node. It has to be unique.

Defined in: [tree-node.ts:13](https://github.com/ckotzbauer/simple-tree-component/blob/a370806/src/types/tree-node.ts#L13)
