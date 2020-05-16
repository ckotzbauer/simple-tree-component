import { DataService } from "../data/data-service";
import { BaseOptions } from "../types/options";
import { Instance } from "../types/instance";
import { BaseTree } from "./base-tree";
import { createContainer } from "./utils";
import classNames from "./class-names";
import { TreeNode } from "types/tree-node";

export class TreeView implements Instance<"view"> {
    private dataService: DataService;
    private tree: BaseTree;
    public selected!: TreeNode | TreeNode[];

    constructor(private element: HTMLElement, public options: BaseOptions) {
        const container: HTMLElement = createContainer(element, classNames.SimpleTree);

        this.dataService = new DataService(options.nodes);
        this.tree = new BaseTree(container, options, this.dataService);
    }

    public destroy(): void {
        this.tree.destroy();
        Array.from(this.element.children).forEach((e: Element) => this.element.removeChild(e));

        this.dataService.clear();
    }
}
