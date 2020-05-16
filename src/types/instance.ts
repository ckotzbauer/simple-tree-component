import { Options, BaseOptions } from "./options";
import { TreeNode } from "./tree-node";

export interface TreeModeNameMap {
    singleSelectDropdown: TreeNode;
    multiSelectDropdown: TreeNode[];
    view: TreeNode | TreeNode[];
}

export interface Instance<K extends keyof TreeModeNameMap> {
    destroy(): void;
    options: BaseOptions;
    selected: TreeModeNameMap[K];
}

export interface SimpleTreeFn {
    <K extends keyof TreeModeNameMap>(selector: Node, mode: K, config?: Options): Instance<K>;
    <K extends keyof TreeModeNameMap>(selector: ArrayLike<Node>, config?: Options): Instance<K>[];
    <K extends keyof TreeModeNameMap>(selector: string, config?: Options): Instance<K> | Instance<K>[];
    defaultConfig: Partial<BaseOptions>;
}
