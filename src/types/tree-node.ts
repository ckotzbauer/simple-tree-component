export interface TreeNode {
    // The displayed text in the rendered tree
    label: string;
    // The unique data value of the tree node
    value: string;

    disabled: boolean;
    selected: boolean;
    children: TreeNode[];
    collapsed: boolean;
    hidden: boolean;
}
