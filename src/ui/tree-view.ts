import { DataService } from "../data/data-service";
import { InternalOptions } from "../types/options";
import { Instance } from "../types/instance";
import { BaseTree } from "./base-tree";
import { createContainer } from "./utils";
import { TreeNode } from "types/tree-node";
import constants from "./ui-constants";

export class TreeView implements Instance<"view"> {
    private dataService: DataService;
    private tree: BaseTree;
    private selected!: TreeNode | TreeNode[];

    constructor(private element: HTMLElement, public options: InternalOptions) {
        const container: HTMLElement = createContainer(element, constants.classNames.SimpleTree);

        this.dataService = new DataService(options.nodes);
        this.tree = new BaseTree(container, options, this.dataService, this.nodeSelected.bind(this));
        this.tree.renderContent();
    }

    /////////////////////////////// PUBLIC API ///////////////////////////////

    public destroy(): void {
        this.tree.destroy();
        Array.from(this.element.children).forEach((e: Element) => this.element.removeChild(e));

        this.dataService.clear();
    }

    public setSelected(value: TreeNode | TreeNode[]): void {
        this.selected = value;
    }

    public getSelected(): TreeNode | TreeNode[] {
        return this.selected;
    }

    public showEmphasizeIcon(): void {
        throw new Error("Feature not supported in tree-mode!");
    }

    public hideEmphasizeIcon(): void {
        throw new Error("Feature not supported in tree-mode!");
    }

    //////////////////////////////////////////////////////////////////////////

    private nodeSelected(node: TreeNode): void {
        this.selected = node;
    }
}
