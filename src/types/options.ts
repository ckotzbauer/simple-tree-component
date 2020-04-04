import { TreeNode } from "./tree-node";

export type ComponentMode =
    | "view"
    | "singleSelectDropdown"
    | "multiSelectDropdown";

export interface TreeConfiguration {
    searchBar: boolean;
}

export interface BaseOptions extends TreeConfiguration {
    mode: ComponentMode;
    nodes: TreeNode[];
}

export const defaults: BaseOptions = {
    mode: "view",
    searchBar: true,
    nodes: [],
};

export type Options = Partial<BaseOptions>;
