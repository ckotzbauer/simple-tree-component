import { Instance, SimpleTreeFn } from "./types/instance";
import { Options } from "./types/options";
import { createSimpleTree } from "./factory";

function _simpleTree(nodeList: ArrayLike<Node>, config?: Options): Instance | Instance[] {
    // static list
    const nodes = Array.prototype.slice
        .call(nodeList)
        .filter(x => x instanceof HTMLElement) as HTMLElement[];

    const instances: Instance[] = [];
    for (let i = 0; i < nodes.length; i++) {
        const node: any = nodes[i];
        try {
            if (node._simpleTree !== undefined) {
                node._simpleTree.destroy();
                node._simpleTree = undefined;
            }

            node._simpleTree = createSimpleTree(node, config || {});
            instances.push(node._simpleTree);
        } catch (e) {
            console.error(e);
        }
    }

    return instances.length === 1 ? instances[0] : instances;
}

const simpleTree = function(selector: ArrayLike<Node> | Node | string, config?: Options) {
    if (typeof selector === "string") {
        return _simpleTree(window.document.querySelectorAll(selector), config);
    } else if (selector instanceof Node) {
        return _simpleTree([selector], config);
    } else {
        return _simpleTree(selector, config);
    }
} as SimpleTreeFn;

export default simpleTree;
