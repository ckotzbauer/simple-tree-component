import { TreeNode } from "./tree-node";
export declare type ComponentMode = "view" | "singleSelectDropdown" | "multiSelectDropdown";
export interface TreeConfiguration {
    searchBar: boolean;
    searchBarFocus: boolean;
    watermark: string;
    css: {
        dropdownHolder: string;
    };
    templateSelectedText: (node: TreeNode) => string;
    treeViewCheckboxes: boolean;
    checkboxRecursiveSelect: boolean;
}
export interface BaseOptions extends TreeConfiguration {
    nodes: TreeNode[];
}
export declare const defaults: BaseOptions;
export declare type Options = Partial<BaseOptions>;
