import { Instance, SimpleTreeFn, TreeModeNameMap } from "./types/instance";
import { Options, ComponentMode } from "./types/options";
import { createSimpleTree } from "./factory";

// eslint-disable-next-line @typescript-eslint/naming-convention
function _simpleTree<K extends keyof TreeModeNameMap>(
    nodeList: ArrayLike<Node>,
    mode: K,
    config?: Options<K>
): Instance<K> | Instance<K>[] {
    // static list
    const nodes = Array.prototype.slice.call(nodeList).filter((x) => x instanceof HTMLElement) as HTMLElement[];

    const instances: Instance<K>[] = [];
    for (let i = 0; i < nodes.length; i++) {
        const node: any = nodes[i];
        try {
            if (node._simpleTree !== undefined) {
                node._simpleTree.destroy();
                node._simpleTree = undefined;
            }

            node._simpleTree = createSimpleTree(node, mode, config || {});
            instances.push(node._simpleTree);
        } catch (e) {
            console.error(e);
        }
    }

    return instances.length === 1 ? instances[0] : instances;
}

const simpleTree = function (selector: ArrayLike<Node> | Node | string, mode: ComponentMode, config?: Options<any>) {
    if (typeof selector === "string") {
        return _simpleTree(window.document.querySelectorAll(selector), mode, config);
    } else if (selector instanceof Node) {
        return _simpleTree([selector], mode, config);
    } else {
        return _simpleTree(selector, mode, config);
    }
} as SimpleTreeFn;

export default simpleTree;
