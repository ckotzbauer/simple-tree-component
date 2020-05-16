import { TreeNode } from "./tree-node";

export type ComponentMode = "view" | "singleSelectDropdown" | "multiSelectDropdown";

export interface TreeConfiguration {
    searchBar: boolean;
    css: {
        dropdownHolder: string;
    };
}

export interface BaseOptions extends TreeConfiguration {
    nodes: TreeNode[];
}

export interface InternalOptions extends BaseOptions {
    highlightSelected: boolean;
}

export const defaults: InternalOptions = {
    nodes: [],
    searchBar: true,
    css: {
        dropdownHolder: "",
    },
    highlightSelected: false,
};

export type Options = Partial<BaseOptions>;
