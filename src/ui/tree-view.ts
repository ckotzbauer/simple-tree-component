import { DataService } from "../data/data-service";
import { BaseOptions } from "../types/options";
import { Instance } from "../types/instance";
import { BaseTree } from "./base-tree";
import { createContainer } from "./utils";

export class TreeView implements Instance {
    private dataService: DataService;
    public tree: BaseTree;

    constructor(private element: HTMLElement, public options: BaseOptions) {
        const container: HTMLElement = createContainer(element);

        this.dataService = new DataService(options.nodes);
        this.tree = new BaseTree(container, options, this.dataService);
    }

    public destroy(): void {
        this.tree.destroy();
        Array.from(this.element.children).forEach((e: Element) => this.element.removeChild(e));

        this.dataService.clear();
    }
}
