import simpleTree from "./index";
import { Instance } from "./types/instance";
import { Options } from "./types/options";

export interface Context {
    elem: undefined | HTMLInputElement;
    stc: Instance | undefined;
    UA: string;
    mockAgent: string | undefined;
}

export function simulate(eventType: string, onElement: Node, options?: object, type?: any) {
    const eventOptions = Object.assign(options || {}, { bubbles: true });
    const evt = new (type || CustomEvent)(eventType, eventOptions);
    try {
        Object.assign(evt, eventOptions);
    } catch (e) {}

    onElement.dispatchEvent(evt);
}

export function initialize() {
    jest.useFakeTimers();

    const ctx: Context = {
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

export function beforeEachTest(ctx: Context) {
    ctx.mockAgent = undefined;
    jest.runAllTimers();
    (document.activeElement as HTMLElement).blur();

    ctx.stc && ctx.stc.destroy && ctx.stc.destroy();

    if (ctx.elem === undefined) {
        ctx.elem = document.createElement("input");
        document.body.appendChild(ctx.elem);
    }
}

export function createInstance(ctx: Context, config?: Options, el?: HTMLElement) {
    ctx.stc = simpleTree(el || ctx.elem || document.createElement("input"), config || {}) as Instance;
    return ctx.stc;
}
