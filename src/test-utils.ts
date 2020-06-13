import simpleTree from "./index";
import { Instance, TreeModeNameMap } from "./types/instance";
import { Options } from "./types/options";
import { TreeNode } from "types/tree-node";

export interface Context<K extends keyof TreeModeNameMap> {
    elem: undefined | HTMLInputElement;
    stc: Instance<K> | undefined;
    UA: string;
    mockAgent: string | undefined;
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

export function initialize<K extends keyof TreeModeNameMap>(): Context<K> {
    jest.useFakeTimers();

    const ctx: Context<K> = {
        elem: undefined,
        UA: navigator.userAgent,
        stc: undefined,
        mockAgent: undefined,
    };

    (navigator as any).__defineGetter__("userAgent", function () {
        return ctx.mockAgent || ctx.UA;
    });

    return ctx;
}

export function beforeEachTest<K extends keyof TreeModeNameMap>(ctx: Context<K>): void {
    ctx.mockAgent = undefined;
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
    config?: Options<K>,
    el?: HTMLElement
): Instance<K> {
    ctx.stc = simpleTree<K>(el || ctx.elem || document.createElement("input"), mode, config || {}) as Instance<K>;
    return ctx.stc;
}

export function createTreeNode(label: string, value: string | null | undefined, children: TreeNode[] = []): TreeNode {
    return {
        label: label,
        value: value as string,
        disabled: false,
        selected: false,
        selectable: true,
        children: children,
        collapsed: false,
        hidden: false,
    };
}
