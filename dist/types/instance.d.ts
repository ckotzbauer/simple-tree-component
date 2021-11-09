import { Options, BaseOptions } from "./options";
import { InitTreeNode, TreeNode } from "./tree-node";
import { Subscription } from "../types/subscription";
export interface TreeModeNameMap {
    singleSelectDropdown: TreeNode | null;
    multiSelectDropdown: TreeNode[];
    tree: TreeNode | TreeNode[] | null;
}
/**
 * Represents the public api of a tree-instance.
 */
export interface TreeInstance<K extends keyof TreeModeNameMap> {
    /**
     * Applied configuration options for the current instance.
     */
    options: BaseOptions;
    /**
     * Destroy the current instance and remove all modifications to the dom.
     */
    destroy(): void;
    /**
     * Returns a tree-node which has the given `value` as value-property.
     *
     * @param value of a tree-node which should be returned.
     * @returns a matching tree-node or null.
     */
    getNode(value: string): TreeNode | null;
    /**
     * Adds a new node to the tree with a optional parent.
     *
     * @param node to add.
     * @param parent of the new tree-node or null
     */
    addNode(node: InitTreeNode, parent?: TreeNode | string | null): void;
    /**
     * Deletes the given tree-node from the tree.
     *
     * @param node to delete.
     */
    deleteNode(node: TreeNode): void;
    /**
     * Replaces all nodes with the given ones.
     *
     * @param nodes to set.
     */
    setNodes(nodes: InitTreeNode[]): void;
    /**
     * Updates the display-text of the given tree-node.
     *
     * @param node to update.
     * @param newLabel-text to use for the given node.
     */
    updateNodeLabel(node: TreeNode, newLabel: string): void;
    /**
     * Moves the up or down in the same hierarchy-level.
     *
     * @param value tree-node object to move.
     * @param direction of move-operation.
     */
    moveNode(value: TreeNode | string, direction: "up" | "down"): void;
    /**
     * Returns one or multiple selected tree-node objects, depending on the mode.
     *
     * @returns a tree-node object in single-mode and view-mode without checkboxes. An array of nodes otherwise.
     */
    getSelected(): TreeModeNameMap[K];
    /**
     * Resets the selection-state of tree-nodes to the given one(s).
     *
     * @param value a tree-node object in single-mode and view-mode without checkboxes. An array of nodes otherwise.
     */
    setSelected(value: TreeModeNameMap[K]): void;
    /**
     * Changes the read-only state of the tree.
     *
     * @param readOnly state of the tree.
     */
    setReadOnly(readOnly: boolean): void;
    /**
     * Only usable in single-mode. Shows an icon for a selected tree-node.
     *
     * @param cssClass to set on the icon-area.
     */
    showEmphasizeIcon(cssClass: string): void;
    /**
     * Only usable in single-mode. Hides the emphasize-icon again.
     */
    hideEmphasizeIcon(): void;
    /**
     * Collapse all nodes in the tree.
     */
    collapseAllNodes(): void;
    /**
     * Expand all nodes in the tree.
     */
    expandAllNodes(): void;
    /**
     * Collapse a specific node in the tree. Does nothing if the node does not exist or is invisible.
     */
    collapseNode(node: TreeNode): void;
    /**
     * Expand a specific node in the tree. Does nothing if the node does not exist or is invisible.
     */
    expandNode(node: TreeNode): void;
    /**
     * Collapses or expands a specific node in the tree. Does nothing if the node does not exist or is invisible.
     */
    toggleCollapseNode(node: TreeNode): void;
    /**
     * Add a listener to handle "selectionChanged", "selectionChanging" or "nodeIndexChanged" events.
     *
     * @param event "selectionChanged", "selectionChanging" or "nodeIndexChanged" event
     * @param handler to execute custom logic on this event.
     * @returns a subscription object to unsubscribe again.
     */
    subscribe(event: "selectionChanged", handler: (d: TreeModeNameMap[K], evt: string, e?: Event) => void): Subscription;
    subscribe(event: "selectionChanging", handler: (d: TreeModeNameMap[K], evt: string, e?: Event) => void): Subscription;
    subscribe(event: "nodeIndexChanged", handler: (d: {
        node: TreeNode;
        newIndex: number;
    }, evt: string, e?: Event) => void): Subscription;
    /**
     * Add a listener to handle "selectionChanged" "selectionChanging" or "nodeIndexChanged" events. When the event is emitted for the first time, the subscription ends automatically.
     *
     * @param event "selectionChanged", "selectionChanging" or "nodeIndexChanged" event
     * @param handler to execute custom logic on this event.
     * @returns a subscription object to unsubscribe again.
     */
    subscribeOnce(event: "selectionChanged", handler: (d: TreeModeNameMap[K], evt: string, e?: Event) => void): Subscription;
    subscribeOnce(event: "selectionChanging", handler: (d: TreeModeNameMap[K], evt: string, e?: Event) => void): Subscription;
    subscribeOnce(event: "nodeIndexChanged", handler: (d: {
        node: TreeNode;
        newIndex: number;
    }, evt: string, e?: Event) => void): Subscription;
}
export declare type SimpleTree = TreeInstance<"singleSelectDropdown" | "multiSelectDropdown" | "tree">;
export interface SimpleTreeFn {
    <K extends keyof TreeModeNameMap>(selector: Node, mode: K, config?: Options): TreeInstance<K>;
    <K extends keyof TreeModeNameMap>(selector: ArrayLike<Node>, mode: K, config?: Options): TreeInstance<K>[];
    <K extends keyof TreeModeNameMap>(selector: string, mode: K, config?: Options): TreeInstance<K> | TreeInstance<K>[];
    defaultConfig: Partial<BaseOptions>;
}
