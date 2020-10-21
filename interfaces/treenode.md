# Interface: TreeNode

The data representation of each node-object in the tree.

## Hierarchy

* **TreeNode**

## Index

### Properties

* [children](treenode.md#children)
* [collapsed](treenode.md#collapsed)
* [disabled](treenode.md#disabled)
* [hidden](treenode.md#hidden)
* [label](treenode.md#label)
* [selectable](treenode.md#selectable)
* [selected](treenode.md#selected)
* [uid](treenode.md#uid)
* [value](treenode.md#value)

## Properties

### children

•  **children**: [TreeNode](treenode.md)[]

*Defined in [types/tree-node.ts:33](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/tree-node.ts#L33)*

Recursive array of child `TreeNode` objects.

___

### collapsed

•  **collapsed**: boolean

*Defined in [types/tree-node.ts:38](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/tree-node.ts#L38)*

Indicates if this node (in case it has child-nodes) is currently collapsed.

___

### disabled

•  **disabled**: boolean

*Defined in [types/tree-node.ts:18](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/tree-node.ts#L18)*

Indicates if this node is disabled.

___

### hidden

•  **hidden**: boolean

*Defined in [types/tree-node.ts:43](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/tree-node.ts#L43)*

Indicates if this node is visible in the tree.

___

### label

•  **label**: string

*Defined in [types/tree-node.ts:8](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/tree-node.ts#L8)*

The displayed text of this tree-node.

___

### selectable

•  **selectable**: boolean

*Defined in [types/tree-node.ts:28](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/tree-node.ts#L28)*

Indicates if this node is selectable. Mouse-clicks on the node are avoided if `false`.

___

### selected

•  **selected**: boolean

*Defined in [types/tree-node.ts:23](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/tree-node.ts#L23)*

Indicates if this node is currently selected and included in the component-value ({@link Instance.getSelected()}).

___

### uid

•  **uid**: string

*Defined in [types/tree-node.ts:48](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/tree-node.ts#L48)*

The unique id-value used internally.

___

### value

•  **value**: string

*Defined in [types/tree-node.ts:13](https://github.com/ckotzbauer/simple-tree-component/blob/466dabf/src/types/tree-node.ts#L13)*

The data-value of this tree-node. It has to be unique.
