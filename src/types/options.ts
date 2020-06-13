import { TreeNode } from "./tree-node";
import { TreeModeNameMap } from "./instance";

export type ComponentMode = "view" | "singleSelectDropdown" | "multiSelectDropdown";

export interface TreeConfiguration<K extends keyof TreeModeNameMap> {
    searchBar: boolean;
    watermark: string;
    css: {
        dropdownHolder: string;
    };
    events: {
        onSelectionChanged: (selected: TreeModeNameMap[K]) => void;
    };
    templateSelectedText: (node: TreeNode) => string;
}

export interface BaseOptions<K extends keyof TreeModeNameMap> extends TreeConfiguration<K> {
    nodes: TreeNode[];
}

export interface InternalOptions<K extends keyof TreeModeNameMap> extends BaseOptions<K> {
    highlightSelected: boolean;
}

export const defaults: InternalOptions<any> = {
    nodes: [],
    searchBar: true,
    watermark: "Please select a value...",
    css: {
        dropdownHolder: "",
    },
    events: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSelectionChanged: (): void => {},
    },
    templateSelectedText: (node: TreeNode) => node.label,
    highlightSelected: false,
};

export type Options<K extends keyof TreeModeNameMap> = Partial<BaseOptions<K>>;
