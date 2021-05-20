import simpleTree from "./index";
import { TreeInstance, TreeModeNameMap } from "./types/instance";
import { Options } from "./types/options";
import { TreeNode } from "./types/tree-node";
import { DataService } from "./data/data-service";
import constants from "./ui/ui-constants";

export interface Context<K extends keyof TreeModeNameMap> {
    elem: undefined | HTMLInputElement;
    stc: TreeInstance<K> | undefined;
    dataService: DataService | undefined;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function simulate(eventType: string, onElement: Node | Window, options?: unknown, type?: any): void {
    const eventOptions = Object.assign(options || {}, { bubbles: true });
    const evt = new (type || CustomEvent)(eventType, eventOptions);
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
    el?: HTMLInputElement | string
): TreeInstance<K> {
    ctx.elem = (el as HTMLInputElement) || ctx.elem || document.createElement("input");
    ctx.stc = simpleTree<K>(ctx.elem, mode, config || {}) as TreeInstance<K>;
    ctx.dataService = (ctx.stc as any).dataService;
    return ctx.stc;
}

export function createTreeNode(
    label: string,
    value: string | null | undefined,
    children: TreeNode[] = [],
    selected = false,
    selectable = true
): TreeNode {
    return {
        label: label,
        value: value as string,
        selected,
        selectable,
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

// eslint-disable-next-line @typescript-eslint/ban-types
export function expectObjectsInArray(array: any[], ...o: object[]): void {
    expect(array).toEqual(expect.arrayContaining(o.map((x) => expect.objectContaining(x))));
}

export function isDropdownVisible(): boolean {
    const e = document.querySelector(`.${constants.classNames.SimpleTreeDropdownHolder}`) as HTMLElement;
    return e?.style.display !== "none";
}
