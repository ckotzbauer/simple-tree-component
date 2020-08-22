import simpleTree from "./index";
import { Instance, TreeModeNameMap } from "./types/instance";
import { Options } from "./types/options";
import { TreeNode } from "./types/tree-node";
import { DataService } from "./data/data-service";

export interface Context<K extends keyof TreeModeNameMap> {
    elem: undefined | HTMLInputElement;
    stc: Instance<K> | undefined;
    dataService: DataService | undefined;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function simulate(eventType: string, onElement: Node, options?: unknown, type?: any): void {
    const eventOptions = Object.assign(options || {}, { bubbles: true });
    const evt = new (type || CustomEvent)(eventType, eventOptions);
    try {
        Object.assign(evt, eventOptions);
    } catch (e) {}

    onElement.dispatchEvent(evt);
}

export function clickTreeNode(node: TreeNode | null): void {
    simulate("click", Array.from(document.getElementById(`${node?.uid}`)?.firstChild?.childNodes as any)[1] as HTMLElement);
}

export function openDropdown<K extends keyof TreeModeNameMap>(ctx: Context<K>, cssClass: string): void {
    simulate("click", ctx.elem?.querySelector(`.${cssClass}`) as HTMLElement);
}

export function initialize<K extends keyof TreeModeNameMap>(): Context<K> {
    jest.useFakeTimers();

    const ctx: Context<K> = {
        elem: undefined,
        stc: undefined,
        dataService: undefined,
    };

    return ctx;
}

export function beforeEachTest<K extends keyof TreeModeNameMap>(ctx: Context<K>): void {
    jest.runAllTimers();
    (document.activeElement as HTMLElement).blur();

    ctx.stc && ctx.stc.destroy && ctx.stc.destroy();

    if (ctx.elem === undefined) {
        ctx.elem = document.createElement("input");
        document.body.appendChild(ctx.elem);
    }
}

export function createInstance<K extends keyof TreeModeNameMap>(
    ctx: Context<K>,
    mode: K,
    config?: Options,
    el?: HTMLInputElement
): Instance<K> {
    ctx.elem = el || ctx.elem || document.createElement("input");
    ctx.stc = simpleTree<K>(ctx.elem, mode, config || {}) as Instance<K>;
    ctx.dataService = (ctx.stc as any).dataService;
    return ctx.stc;
}

export function createTreeNode(
    label: string,
    value: string | null | undefined,
    children: TreeNode[] = [],
    selected = false
): TreeNode {
    return {
        label: label,
        value: value as string,
        disabled: false,
        selected,
        selectable: true,
        children: children,
        collapsed: false,
        hidden: false,
        uid: "",
    };
}

export function countTreeNodes(treeNodes: TreeNode[]): number {
    let count = 0;

    treeNodes.forEach((node: TreeNode) => {
        count++;
        count += countTreeNodes(node.children);
    });

    return count;
}
