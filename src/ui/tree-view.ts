import { BaseOptions } from "../types/options";
import { BaseTree } from "./base-tree";
import { createContainer } from "./utils";
import { TreeNode } from "../types/tree-node";
import constants from "./ui-constants";
import { CommonTreeLogic } from "./common-tree-logic";

export class TreeView extends CommonTreeLogic<"view"> {
    constructor(element: HTMLElement, options: BaseOptions) {
        super(element, options);
        this.rootContainer = createContainer(element, constants.classNames.SimpleTree, constants.classNames.SimpleTreeViewOnly);

        if (options.treeViewCheckboxes) {
            this.selected = this.dataService.getSelected();
        } else {
            this.selected = this.dataService.getSelected()[0] || null;
        }

        this.tree = new BaseTree(this.rootContainer, options, this.dataService, this.eventManager, this.readOnly);
        this.subscribe(constants.events.NodeSelected, (n: TreeNode) => this.nodeSelected(n));
        this.tree.renderContent();
        this.tree.activateKeyListener();
    }

    /////////////////////////////// PUBLIC API ///////////////////////////////

    public setSelected(value: TreeNode | TreeNode[]): void {
        if (this.options.treeViewCheckboxes) {
            this.dataService.setSelected(...(value as TreeNode[]));
            super.setSelected(this.dataService.getSelected());
        } else {
            this.dataService.setSelected(value as TreeNode);
            super.setSelected(this.dataService.getSelected()[0] || []);
        }
    }

    public moveNode(value: TreeNode | string, direction: "up" | "down"): void {
        this.dataService.moveNode(value, direction);
        this.tree.renderContent();
    }

    //////////////////////////////////////////////////////////////////////////

    private nodeSelected(node: TreeNode): void {
        if (this.options.treeViewCheckboxes) {
            this.selected = this.dataService.getSelected();
        } else {
            if (node?.value === (this.selected as TreeNode)?.value) {
                this.dataService.setSelected();
                this.selected = null;
                this.tree.highlightNode(null);
            } else {
                this.dataService.setSelected(node);
                this.selected = this.dataService.getSelected()[0] || null;
                this.tree.highlightNode(node);
            }
        }

        this.eventManager.publish(constants.events.SelectionChanged, this.selected);
    }
}
