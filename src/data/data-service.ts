import { TreeNode } from "../types/tree-node";

export class DataService {
    private allNodes: TreeNode[] = [];

    constructor(public displayedNodes: TreeNode[] = []) {
        this.allNodes = JSON.parse(JSON.stringify(displayedNodes));
    }

    public clear(): void {
        this.displayedNodes = [];
    }

    public getNode(value: string): TreeNode | null {
        return this.getNodeInternal(this.displayedNodes, value);
    }

    private getNodeInternal(nodes: TreeNode[], value: string): TreeNode | null {
        nodes.forEach((node: TreeNode) => {
            if (node.value === value) {
                return node;
            }

            if (node.children && node.children.length > 0) {
                const result: TreeNode | null = this.getNodeInternal(node.children, value);

                if (result) {
                    return result;
                }
            }
        });

        return null;
    }

    public addNode(node: TreeNode, parent: TreeNode | string | null = null): void {
        if (this.isTreeNode(parent)) {
            parent.children.push(node);
        } else if (typeof parent === "string") {
            const parentNode: TreeNode | null = this.getNodeInternal(this.displayedNodes, parent);

            if (this.isTreeNode(parentNode)) {
                parentNode.children.push(node);
            }
        } else {
            this.displayedNodes.push(node);
        }
    }

    private isTreeNode(value: TreeNode | string | null): value is TreeNode {
        return (value as TreeNode).children !== undefined;
    }

    public deleteNode(value: string): void {
        const node: TreeNode | undefined = this.displayedNodes.find((node: TreeNode) => node.value === value);

        if (node) {
            this.displayedNodes.splice(this.displayedNodes.indexOf(node), 1);
        } else {
            const parent: TreeNode | null = this.getParentForNode(this.displayedNodes, value);

            if (parent) {
                const childNode: TreeNode = parent.children.find((node: TreeNode) => node.value === value) as TreeNode;
                parent.children.splice(parent.children.indexOf(childNode), 1);
            }
        }
    }

    private getParentForNode(nodes: TreeNode[], value: string): TreeNode | null {
        nodes.forEach((node: TreeNode) => {
            if (node.children.some((n: TreeNode) => n.value === value)) {
                return node;
            }

            const parent: TreeNode | null = this.getParentForNode(node.children, value);

            if (parent) {
                return parent;
            }
        });

        return null;
    }

    public filter(searchTerm: string, renderCallback: () => void): void {
        const allNodeCopy: TreeNode[] = JSON.parse(JSON.stringify(this.allNodes));
        if (searchTerm) {
            this.displayedNodes = this.filterNodes(allNodeCopy, searchTerm.toLowerCase());
        } else {
            this.displayedNodes = allNodeCopy;
        }

        if (renderCallback) {
            renderCallback();
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
