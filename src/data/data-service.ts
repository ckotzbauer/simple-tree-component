import { TreeNode } from "../types/tree-node";

export class DataService {
    constructor(public nodes: TreeNode[] = []) {}

    public clear(): void {
        this.nodes = [];
    }

    public getNode(value: string): TreeNode | null {
        return this.getNodeInternal(this.nodes, value);
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
            const parentNode: TreeNode | null = this.getNodeInternal(this.nodes, parent);

            if (this.isTreeNode(parentNode)) {
                parentNode.children.push(node);
            }
        } else {
            this.nodes.push(node);
        }
    }

    private isTreeNode(value: TreeNode | string | null): value is TreeNode {
        return (value as TreeNode).children !== undefined;
    }

    public deleteNode(value: string): void {
        const node: TreeNode | undefined = this.nodes.find((node: TreeNode) => node.value === value);

        if (node) {
            this.nodes.splice(this.nodes.indexOf(node), 1);
        } else {
            const parent: TreeNode | null = this.getParentForNode(this.nodes, value);

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
}
