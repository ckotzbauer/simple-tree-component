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

export const defaults: BaseOptions = {
    nodes: [],
    searchBar: true,
    css: {
        dropdownHolder: "",
    },
};

export type Options = Partial<BaseOptions>;
