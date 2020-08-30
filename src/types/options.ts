import { TreeNode } from "./tree-node";

/**
 * @ignore
 */
export type ComponentMode = "view" | "singleSelectDropdown" | "multiSelectDropdown";

/**
 * @ignore
 */
export interface TreeConfiguration {
    /**
     * Add a searchbar to search for tree-nodes. (Default: `true`)
     */
    searchBar: boolean;

    /**
     * A watermark text which is displayed if no value is selected.
     * Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.
     * (Default: `Please select a value...`)
     */
    watermark: string;

    /**
     * Custom css-classes.
     */
    css: {
        /**
         * Custom css-class added to the dropdown-container element.
         * Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.
         * (Default: `""`)
         */
        dropdownHolder: string;
    };

    /**
     * Template function which is called if the given node is selected.
     * Only used in modes `singleSelectDropdown` and `multiSelectDropdown`.
     * @param node The tree-node to return a text-value for.
     * @returns Any string value which should be displayed. (Default: `node.label`)
     */
    templateSelectedText: (node: TreeNode) => string;

    /**
     * Enable checkboxes in the tree-only-view mode. This also enables multi-selection.
     * Only used in mode `view`.
     * (Default: `false`)
     */
    treeViewCheckboxes: boolean;

    /**
     * Indicates if the checkbox-value of a parent-node should also change the value of its childs.
     * (Default: `false`)
     */
    checkboxRecursiveSelect: boolean;
}

/**
 * All instance-specific options and behaviors to initialize the tree.
 */
export interface BaseOptions extends TreeConfiguration {
    /**
     * All tree-node data-objects to start with.
     * (Default: `[]`)
     */
    nodes: TreeNode[];
}

/**
 * @ignore
 */
export const defaults: BaseOptions = {
    nodes: [],
    searchBar: true,
    watermark: "Please select a value...",
    css: {
        dropdownHolder: "",
    },
    templateSelectedText: (node: TreeNode) => node.label,
    treeViewCheckboxes: false,
    checkboxRecursiveSelect: false,
};

/**
 * A partial representation of `BaseOptions`. All other values are set to its defaults.
 */
export type Options = Partial<BaseOptions>;
