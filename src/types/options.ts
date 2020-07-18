import { TreeNode } from "./tree-node";

export type ComponentMode = "view" | "singleSelectDropdown" | "multiSelectDropdown";

export interface TreeConfiguration {
    searchBar: boolean;
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

export const defaults: BaseOptions = {
    nodes: [],
    searchBar: true,
    watermark: "Please select a value...",
    css: {
        dropdownHolder: "",
    },
    templateSelectedText: (node: TreeNode) => node.label,
    treeViewCheckboxes: false,
    checkboxRecursiveSelect: false,
};

export type Options = Partial<BaseOptions>;
