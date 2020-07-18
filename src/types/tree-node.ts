export interface TreeNode {
    // The displayed text in the rendered tree
    label: string;
    // The unique data value of the tree node
    value: string;

    disabled: boolean;
    selected: boolean;
    selectable: boolean;
    children: TreeNode[];
    collapsed: boolean;
    hidden: boolean;
    uid: string;
}

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
