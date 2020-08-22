import { BaseOptions } from "../types/options";
import { BaseTree } from "./base-tree";
import { createContainer } from "./utils";
import { TreeNode } from "../types/tree-node";
import constants from "./ui-constants";
import { CommonTreeLogic } from "./common-tree-logic";

export class TreeView extends CommonTreeLogic<"view"> {
    constructor(element: HTMLElement, options: BaseOptions) {
        super(element, options);
        this.rootContainer = createContainer(element, constants.classNames.SimpleTree);

        if (options.treeViewCheckboxes) {
            this.selected = this.dataService.getSelected();
        } else {
            this.selected = this.dataService.getSelected()[0] || null;
        }

        this.tree = new BaseTree(this.rootContainer, options, this.dataService, this.eventManager, this.readOnly);
        this.subscribe(constants.events.NodeSelected, (n: TreeNode) => this.nodeSelected(n));
        this.tree.renderContent();
    }

    /////////////////////////////// PUBLIC API ///////////////////////////////

    public setSelected(value: TreeNode | TreeNode[]): void {
        super.setSelected(value);

        if (this.options.treeViewCheckboxes) {
            this.dataService.setSelected(...(value as TreeNode[]));
        } else {
            this.dataService.setSelected(value as TreeNode);
        }
    }

    //////////////////////////////////////////////////////////////////////////

    private nodeSelected(node: TreeNode): void {
        if (this.options.treeViewCheckboxes) {
            if (node.selected) {
                (this.selected as TreeNode[]).push(node);
            } else {
                (this.selected as TreeNode[]).splice((this.selected as TreeNode[]).indexOf(node), 1);
            }

            this.dataService.setSelected(...(this.selected as TreeNode[]));
        } else {
            this.selected = node;
            this.dataService.setSelected(node);
            this.tree.setHighlighting(node);
        }

        this.eventManager.publish(constants.events.SelectionChanged, this.selected);
    }
}
