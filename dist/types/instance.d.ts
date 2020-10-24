import { Options, BaseOptions } from "./options";
import { TreeNode } from "./tree-node";
import { Subscription } from "../types/subscription";
export interface TreeModeNameMap {
    singleSelectDropdown: TreeNode | null;
    multiSelectDropdown: TreeNode[];
    tree: TreeNode | TreeNode[] | null;
}
export interface TreeInstance<K extends keyof TreeModeNameMap> {
    options: BaseOptions;
    destroy(): void;
    getNode(value: string): TreeNode | null;
    addNode(node: TreeNode, parent: TreeNode | string | null): void;
    deleteNode(node: TreeNode): void;
    updateNodeLabel(node: TreeNode, newLabel: string): void;
    moveNode(value: TreeNode | string, direction: "up" | "down"): void;
    getSelected(): TreeModeNameMap[K];
    setSelected(value: TreeModeNameMap[K]): void;
    setReadOnly(readOnly: boolean): void;
    showEmphasizeIcon(cssClass: string): void;
    hideEmphasizeIcon(): void;
    subscribe(event: "selectionChanged", handler: (d: TreeModeNameMap[K], e: string) => void): Subscription;
    subscribeOnce(event: "selectionChanged", handler: (d: TreeModeNameMap[K], e: string) => void): Subscription;
}
export declare type SimpleTree = TreeInstance<"singleSelectDropdown" | "multiSelectDropdown" | "tree">;
export interface SimpleTreeFn {
    <K extends keyof TreeModeNameMap>(selector: Node, mode: K, config?: Options): TreeInstance<K>;
    <K extends keyof TreeModeNameMap>(selector: ArrayLike<Node>, mode: K, config?: Options): TreeInstance<K>[];
    <K extends keyof TreeModeNameMap>(selector: string, mode: K, config?: Options): TreeInstance<K> | TreeInstance<K>[];
    defaultConfig: Partial<BaseOptions>;
}
