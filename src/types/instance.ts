import { Options, BaseOptions } from "./options";
import { TreeNode } from "./tree-node";

export interface TreeModeNameMap {
    singleSelectDropdown: TreeNode;
    multiSelectDropdown: TreeNode[];
    view: TreeNode | TreeNode[];
}

export interface Instance<K extends keyof TreeModeNameMap> {
    options: BaseOptions<K>;
    destroy(): void;
    getSelected(): TreeModeNameMap[K];
    setSelected(value: TreeModeNameMap[K]): void;
    setReadOnly(readOnly: boolean): void;
    showEmphasizeIcon(cssClass: string): void;
    hideEmphasizeIcon(): void;
}

export interface SimpleTreeFn {
    <K extends keyof TreeModeNameMap>(selector: Node, mode: K, config?: Options<K>): Instance<K>;
    <K extends keyof TreeModeNameMap>(selector: ArrayLike<Node>, config?: Options<K>): Instance<K>[];
    <K extends keyof TreeModeNameMap>(selector: string, config?: Options<K>): Instance<K> | Instance<K>[];
    defaultConfig: Partial<BaseOptions<any>>;
}
