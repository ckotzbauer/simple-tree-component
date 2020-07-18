import { BaseOptions } from "../types/options";
import { BaseTree } from "./base-tree";
import { createContainer } from "./utils";
import { TreeNode } from "types/tree-node";
import constants from "./ui-constants";
import { CommonTreeLogic } from "./common-tree-logic";

export class TreeView extends CommonTreeLogic<"view"> {
    constructor(element: HTMLElement, options: BaseOptions) {
        super(element, options);

        if (options.treeViewCheckboxes) {
            this.selected = [];
        }

        this.rootContainer = createContainer(element, constants.classNames.SimpleTree);

        this.tree = new BaseTree(this.rootContainer, options, this.dataService, this.eventManager, this.readOnly);
        this.subscribe(constants.events.NodeSelected, (n: TreeNode) => this.nodeSelected(n));
        this.tree.renderContent();
    }

    private nodeSelected(node: TreeNode): void {
        if (this.options.treeViewCheckboxes) {
            if (node.selected) {
                (this.selected as TreeNode[]).push(node);
            } else {
                (this.selected as TreeNode[]).splice((this.selected as TreeNode[]).indexOf(node), 1);
            }
        } else {
            if (this.selected && this.selected !== node) {
                (this.selected as TreeNode).selected = false;
            }

            node.selected = !node.selected;
            this.selected = node;
            this.tree.setHighlighting(node);
        }

        this.eventManager.publish(constants.events.SelectionChanged, this.selected);
    }
}
