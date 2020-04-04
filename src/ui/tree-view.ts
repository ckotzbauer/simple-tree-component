import { DataService } from "data/data-service";
import { BaseOptions } from "types/options";
import { Instance } from "types/instance";
import { BaseTree } from "./base-tree";

export class TreeView implements Instance {
    private dataService: DataService;
    public tree: BaseTree;

    constructor(element: HTMLElement, public options: BaseOptions) {
        this.dataService = new DataService(options.nodes);
        this.tree = new BaseTree(element, options, this.dataService);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public destroy(): void {}
}
