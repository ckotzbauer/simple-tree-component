/**
 * The data representation of each node-object in the tree.
 */
export interface TreeNode {
    /**
     * The displayed text of this tree-node.
     */
    label: string;

    /**
     * The data-value of this tree-node. It has to be unique.
     */
    value: string;

    /**
     * Indicates if this node is disabled.
     */
    disabled: boolean;

    /**
     * Indicates if this node is currently selected and included in the component-value ({@link Instance.getSelected()}).
     */
    selected: boolean;

    /**
     * Indicates if this node is selectable. Mouse-clicks on the node are avoided if `false`.
     */
    selectable: boolean;

    /**
     * Recursive array of child `TreeNode` objects.
     */
    children: TreeNode[];

    /**
     * Indicates if this node (in case it has child-nodes) is currently collapsed.
     */
    collapsed: boolean;

    /**
     * Indicates if this node is visible in the three.
     */
    hidden: boolean;

    /**
     * The unique id-value used internally.
     */
    uid: string;
}

/**
 * @ignore
 */
export const defaults: TreeNode = {
    label: "",
    value: "",
    disabled: false,
    selected: false,
    selectable: true,
    children: [],
    collapsed: false,
    hidden: false,
    uid: "",
};
