export interface TreeNode {
    label: string;
    value: string;
    disabled: boolean;
    selected: boolean;
    children: TreeNode[];
}
