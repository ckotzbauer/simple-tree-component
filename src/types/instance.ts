import { Options, BaseOptions } from "./options";
import { TreeNode } from "./tree-node";
import { Subscription } from "../types/subscription";

export interface TreeModeNameMap {
    singleSelectDropdown: TreeNode | null;
    multiSelectDropdown: TreeNode[];
    view: TreeNode | TreeNode[] | null;
}

/**
 * Represents the public api of a tree-instance.
 */
export interface Instance<K extends keyof TreeModeNameMap> {
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
     * Add a listener to handle "selectionChanged" events.
     *
     * @param event "selectionChanged" event
     * @param handler to execute custom logic on this event.
     * @returns a subscription object to unsubscribe again.
     */
    subscribe(event: "selectionChanged", handler: (d: TreeModeNameMap[K], e: string) => void): Subscription;

    /**
     * Add a listener to handle "selectionChanged" events. When the event is emitted for the first time, the subscription ends automatically.
     *
     * @param event "selectionChanged" event
     * @param handler to execute custom logic on this event.
     * @returns a subscription object to unsubscribe again.
     */
    subscribeOnce(event: "selectionChanged", handler: (d: TreeModeNameMap[K], e: string) => void): Subscription;
}

export type SimpleTree = Instance<"singleSelectDropdown" | "multiSelectDropdown" | "view">;

export interface SimpleTreeFn {
    <K extends keyof TreeModeNameMap>(selector: Node, mode: K, config?: Options): Instance<K>;
    <K extends keyof TreeModeNameMap>(selector: ArrayLike<Node>, config?: Options): Instance<K>[];
    <K extends keyof TreeModeNameMap>(selector: string, config?: Options): Instance<K> | Instance<K>[];
    defaultConfig: Partial<BaseOptions>;
}
