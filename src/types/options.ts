import { TreeNode } from "./tree-node";

export type ComponentMode =
    | "view"
    | "singleSelectDropdown"
    | "multiSelectDropdown";

export interface BaseOptions {
    mode: ComponentMode;
    searchBar: boolean;
    nodes: TreeNode[];
}

export const defaults: BaseOptions = {
    mode: "view",
    searchBar: true,
    nodes: [],
};

export type Options = Partial<BaseOptions>;
