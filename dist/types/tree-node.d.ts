export interface TreeNode {
    label: string;
    value: string;
    selected: boolean;
    selectable: boolean;
    children: TreeNode[];
    collapsed: boolean;
    hidden: boolean;
    uid: string;
}
export declare const defaults: TreeNode;
