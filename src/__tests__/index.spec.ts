import simpleTree from "../index";
import { Instance } from "../types/instance";

jest.useFakeTimers();

let elem: undefined | HTMLInputElement, stc: Instance;
const UA = navigator.userAgent;
let mockAgent: string | undefined;

(navigator as any).__defineGetter__("userAgent", function () {
    return mockAgent || UA;
});

/*function createInstance(config?: Options, el?: HTMLElement) {
    stc = simpleTree(el || elem || document.createElement("input"), config || {}) as Instance;
    return stc;
}

function simulate(eventType: string, onElement: Node, options?: object, type?: any) {
    const eventOptions = Object.assign(options || {}, { bubbles: true });
    const evt = new (type || CustomEvent)(eventType, eventOptions);
    try {
        Object.assign(evt, eventOptions);
    } catch (e) { }

    onElement.dispatchEvent(evt);
}*/

function beforeEachTest() {
    mockAgent = undefined;
    jest.runAllTimers();
    (document.activeElement as HTMLElement).blur();

    stc && stc.destroy && stc.destroy();

    if (elem === undefined) {
        elem = document.createElement("input");
        document.body.appendChild(elem);
    }
}

describe("simpleTree", () => {
    beforeEach(beforeEachTest);

    describe("init", () => {
        it("should gracefully handle no elements", () => {
            expect(simpleTree([])).toEqual([]);
        });
    });
});
