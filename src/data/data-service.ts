import { TreeNode, defaults } from "../types/tree-node";
import { isDuplicateNodeValue, isTreeNodeValid } from "validation/validation";

export class DataService {
    private allNodes: TreeNode[] = [];

    constructor(public displayedNodes: TreeNode[] = []) {
        this.displayedNodes = this.normalizeNodes(displayedNodes);
        this.allNodes = JSON.parse(JSON.stringify(displayedNodes));
    }

    private normalizeNodes(nodes: TreeNode[]): TreeNode[] {
        return nodes.map((node: TreeNode) => {
            const n: TreeNode = {
                ...defaults,
                ...node,
            };

            n.children = this.normalizeNodes(n.children);
            return n;
        });
    }

    public clear(): void {
        this.allNodes = [];
        this.displayedNodes = [];
    }

    // Currently only used for testing. Maybe see if tests can be refactored with rendering/event logic
    public getAllNodes(): TreeNode[] {
        return this.allNodes;
    }

    public getNode(value: string): TreeNode | null {
        return this.getNodeInternal(this.allNodes, value);
    }

    private getNodeInternal(nodes: TreeNode[], value: string): TreeNode | null {
        for (const node of nodes) {
            if (node.value === value) {
                return node;
            }

            if (node.children && node.children.length > 0) {
                const result: TreeNode | null = this.getNodeInternal(node.children, value);

                if (result) {
                    return result;
                }
            }
        }

        return null;
    }

    public addNode(node: TreeNode, parent: TreeNode | string | null = null): void {
        if (!isTreeNodeValid(node) || isDuplicateNodeValue(this.allNodes, node.value)) {
            throw new Error("node value is invalid or node with value already exists!");
        }

        if (parent && this.isTreeNode(parent)) {
            parent.children.push(node);
        } else if (typeof parent === "string") {
            const parentNode: TreeNode | null = this.getNodeInternal(this.allNodes, parent);

            if (this.isTreeNode(parentNode)) {
                parentNode.children.push(node);
            }
        } else {
            this.allNodes.push(node);
        }
    }

    private isTreeNode(value: TreeNode | string | null): value is TreeNode {
        return (value as TreeNode).children !== undefined;
    }

    public deleteNode(value: string): void {
        const node: TreeNode | undefined = this.allNodes.find((node: TreeNode) => node.value === value);

        if (node) {
            this.allNodes.splice(this.allNodes.indexOf(node), 1);
        } else {
            const parent: TreeNode | null = this.getParentForNode(this.allNodes, value);

            if (parent) {
                const childNode: TreeNode = parent.children.find((node: TreeNode) => node.value === value) as TreeNode;
                parent.children.splice(parent.children.indexOf(childNode), 1);
            }
        }
    }

    private getParentForNode(nodes: TreeNode[], value: string): TreeNode | null {
        for (const node of nodes) {
            if (node.children.some((n: TreeNode) => n.value === value)) {
                return node;
            }

            const parent: TreeNode | null = this.getParentForNode(node.children, value);

            if (parent) {
                return parent;
            }
        }

        return null;
    }

    public filter(searchTerm: string): void {
        const allNodeCopy: TreeNode[] = JSON.parse(JSON.stringify(this.allNodes));
        if (searchTerm) {
            this.displayedNodes = this.filterNodes(allNodeCopy, searchTerm.toLowerCase());
        } else {
            this.displayedNodes = allNodeCopy;
        }
    }

    private filterNodes(nodes: TreeNode[], searchTerm: string): TreeNode[] {
        const filtered: TreeNode[] = [];

        nodes.forEach((n) => {
            n.children = this.filterNodes(n.children, searchTerm);

            if (n.label.toLowerCase().includes(searchTerm) || n.children.length > 0) {
                filtered.push(n);
            }
        });

        return filtered;
    }
}
