/**
 * The data representation of each node-object in the tree at initialization-time.
 */
export interface InitTreeNode {
    /**
     * The displayed text of this tree-node.
     */
    label: string;

    /**
     * The data-value of this tree-node. It has to be unique.
     */
    value: string;

    /**
     * Indicates if this node is currently selected and included in the component-value ({@link Instance.getSelected()}).
     */
    selected?: boolean;

    /**
     * Indicates if this node is selectable. Mouse-clicks on the node are avoided if `false`.
     * Nodes that are not selectable are also ignored when setting via API.
     * In Recursive Checkbox Mode this flag has no effect since all nodes are selectable there.
     */
    selectable?: boolean;

    /**
     * Recursive array of child `TreeNode` objects.
     */
    children?: InitTreeNode[];

    /**
     * Custom css-class added to the line-wrapper element.
     * (Default: `""`)
     */
    cssClass?: string;

    /**
     * Indicates if this node is draggable, when dragAndDrop is enabled.
     * (Default: `true`)
     */
    draggable?: boolean;

    /**
     * Any additional property, which is available (the component-logic will respect them).
     */
    [key: string]: any;
}

/**
 * The data representation of each node-object in the tree.
 */
export interface TreeNode extends InitTreeNode {
    /**
     * Indicates if this node is currently selected and included in the component-value ({@link Instance.getSelected()}).
     */
    selected: boolean;

    /**
     * Indicates if this node is selectable. Mouse-clicks on the node are avoided if `false`.
     * Nodes that are not selectable are also ignored when setting via API.
     * In Recursive Checkbox Mode this flag has no effect since all nodes are selectable there.
     */
    selectable: boolean;

    /**
     * Recursive array of child `TreeNode` objects.
     */
    children: TreeNode[];

    /**
     * Custom css-class added to the line-wrapper element.
     * (Default: `""`)
     */
    cssClass: string;

    /**
     * Indicates if this node is draggable, when dragAndDrop is enabled.
     * (Default: `true`)
     */
    draggable: boolean;

    /**
     * Indicates if this node (in case it has child-nodes) is currently collapsed.
     */
    collapsed: boolean;

    /**
     * Indicates if this node is visible in the tree.
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
    selected: false,
    selectable: true,
    children: [],
    collapsed: false,
    hidden: false,
    uid: "",
    cssClass: "",
    draggable: true,
};
