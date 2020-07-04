import { DataService } from "../data/data-service";
import { InternalOptions } from "../types/options";
import { Instance } from "../types/instance";
import { BaseTree } from "./base-tree";
import { createContainer } from "./utils";
import { TreeNode } from "types/tree-node";
import constants from "./ui-constants";
import { EventManager } from "../event/event";
import { Subscription } from "../types/subscription";

export class TreeView implements Instance<"view"> {
    private dataService: DataService;
    private tree: BaseTree;
    private eventManager: EventManager;

    private readOnly = false;
    private selected!: TreeNode | TreeNode[];

    private rootContainer!: HTMLElement;

    constructor(private element: HTMLElement, public options: InternalOptions) {
        this.rootContainer = createContainer(element, constants.classNames.SimpleTree);

        this.dataService = new DataService(options.nodes);
        this.eventManager = new EventManager();

        this.tree = new BaseTree(this.rootContainer, options, this.dataService, this.readOnly, this.nodeSelected.bind(this));
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

    public setReadOnly(readOnly: boolean): void {
        this.readOnly = readOnly;
        this.tree.readOnly = readOnly;
        this.rootContainer.classList.toggle(constants.classNames.SimpleTreeReadOnly, readOnly);
    }

    public showEmphasizeIcon(): void {
        throw new Error("Feature not supported in tree-mode!");
    }

    public hideEmphasizeIcon(): void {
        throw new Error("Feature not supported in tree-mode!");
    }

    public subscribe(event: string, handler: (d: any, e: string) => void): Subscription {
        return this.eventManager.subscribe(event, handler);
    }

    public subscribeOnce(event: string, handler: (d: any, e: string) => void): Subscription {
        return this.eventManager.subscribeOnce(event, handler);
    }

    //////////////////////////////////////////////////////////////////////////

    private nodeSelected(node: TreeNode): void {
        this.selected = node;
        this.eventManager.publish(constants.events.SelectionChanged, this.selected);
    }
}
