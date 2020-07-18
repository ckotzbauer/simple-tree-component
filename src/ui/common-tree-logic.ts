/* eslint-disable @typescript-eslint/no-unused-vars */
import { Instance, TreeModeNameMap } from "../types/instance";
import { EventManager } from "../event/event";
import { Subscription } from "../types/subscription";
import { DataService } from "../data/data-service";
import constants from "./ui-constants";
import { BaseTree } from "./base-tree";
import { BaseOptions } from "../types/options";

export abstract class CommonTreeLogic<K extends keyof TreeModeNameMap> implements Instance<K> {
    protected eventManager: EventManager;
    protected dataService: DataService;
    protected tree!: BaseTree;

    protected rootContainer!: HTMLElement;

    protected selected!: TreeModeNameMap[K];
    protected readOnly = false;

    constructor(protected element: Element, public options: BaseOptions) {
        this.eventManager = new EventManager();
        this.dataService = new DataService(options.nodes);
    }

    /////////////////////////////// PUBLIC API ///////////////////////////////

    public destroy(): void {
        this.tree.destroy();
        Array.from(this.element.children).forEach((e: Element) => this.element.removeChild(e));

        this.dataService.clear();
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public showEmphasizeIcon(_cssClass: string): void {
        throw new Error("Feature not supported in this mode!");
    }

    public hideEmphasizeIcon(): void {
        throw new Error("Feature not supported in this mode!");
    }

    public setSelected(value: TreeModeNameMap[K]): void {
        this.selected = value;
    }

    public getSelected(): TreeModeNameMap[K] {
        return this.selected;
    }

    public setReadOnly(readOnly: boolean): void {
        this.readOnly = readOnly;
        this.tree.readOnly = readOnly;
        this.rootContainer.classList.toggle(constants.classNames.SimpleTreeReadOnly, readOnly);
    }

    public subscribe(event: string, handler: (d: any, e: string) => void): Subscription {
        return this.eventManager.subscribe(event, handler);
    }

    public subscribeOnce(event: string, handler: (d: any, e: string) => void): Subscription {
        return this.eventManager.subscribeOnce(event, handler);
    }

    //////////////////////////////////////////////////////////////////////////
}
