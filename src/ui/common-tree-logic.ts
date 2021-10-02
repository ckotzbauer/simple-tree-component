/* eslint-disable @typescript-eslint/no-unused-vars */
import { TreeInstance, TreeModeNameMap } from "../types/instance";
import { EventManager } from "../event/event-manager";
import { Subscription } from "../types/subscription";
import { DataService } from "../data/data-service";
import constants from "./ui-constants";
import { BaseTree } from "./base-tree";
import { BaseOptions } from "../types/options";
import { TreeNode } from "../types/tree-node";

export abstract class CommonTreeLogic<K extends keyof TreeModeNameMap> implements TreeInstance<K> {
    protected eventManager: EventManager;
    protected dataService: DataService;
    protected tree!: BaseTree;

    protected rootContainer!: HTMLElement;

    protected selected!: TreeModeNameMap[K];
    protected readOnly = false;

    protected subscriptions: Subscription[] = [];

    constructor(protected element: Element, public options: BaseOptions) {
        this.eventManager = new EventManager();
        this.dataService = new DataService(options.nodes, options.checkboxes.active, options.checkboxes.recursive);
    }

    protected isPrevented(node: TreeNode): boolean {
        const evt: CustomEvent = new CustomEvent(constants.events.NodeSelected, { cancelable: true });
        this.eventManager.publish(constants.events.NodeSelected, node, evt);
        return evt.defaultPrevented;
    }

    /////////////////////////////// PUBLIC API ///////////////////////////////

    public destroy(): void {
        this.tree.destroy();
        Array.from(this.element.children).forEach((e: Element) => this.element.removeChild(e));

        this.dataService.clear();
        this.subscriptions.forEach((s: Subscription) => s.dispose());
        this.subscriptions = [];
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public showEmphasizeIcon(_cssClass: string): void {
        throw new Error("Feature not supported in this mode!");
    }

    public hideEmphasizeIcon(): void {
        throw new Error("Feature not supported in this mode!");
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public moveNode(_value: TreeNode | string, _direction: "up" | "down"): void {
        throw new Error("Feature not supported in this mode!");
    }

    public setSelected(value: TreeModeNameMap[K]): void {
        this.selected = value;
    }

    public getSelected(): TreeModeNameMap[K] {
        return this.selected;
    }

    public getNode(value: string): TreeNode | null {
        return this.dataService.getNode(value);
    }

    public addNode(node: TreeNode, parent: TreeNode | string | null = null): void {
        this.dataService.addNode(node, parent);
    }

    public deleteNode(node: TreeNode): void {
        this.dataService.deleteNode(node.value);
    }

    public updateNodeLabel(node: TreeNode, newLabel: string): void {
        this.dataService.updateNodeLabel(node.value, newLabel);
    }

    public setReadOnly(readOnly: boolean): void {
        if (this.readOnly !== readOnly) {
            this.readOnly = readOnly;
            this.tree.setReadOnly(readOnly);
            this.rootContainer.classList.toggle(constants.classNames.SimpleTreeReadOnly, readOnly);
            this.tree.renderContent();
        }
    }

    public subscribe(event: string, handler: (payload: any, evt: string, e?: Event) => void): Subscription {
        return this.eventManager.subscribe(event, handler);
    }

    public subscribeOnce(event: string, handler: (payload: any, evt: string, e?: Event) => void): Subscription {
        return this.eventManager.subscribeOnce(event, handler);
    }

    //////////////////////////////////////////////////////////////////////////
}
