import { TreeNode, defaults } from "../types/tree-node";
import { isDuplicateNodeValue, isTreeNodeValid } from "../validation/validation";
import constants from "../ui/ui-constants";

export class DataService {
    private allNodes: TreeNode[] = [];

    constructor(public displayedNodes: TreeNode[] = [], private checkboxRecursiveSelect: boolean = false) {
        this.displayedNodes = this.normalizeNodes(displayedNodes);
        this.allNodes = this.normalizeNodes(displayedNodes);
    }

    private normalizeNodes(nodes: TreeNode[]): TreeNode[] {
        return nodes.map((node: TreeNode) => {
            const n = this.copyNode(node);
            n.children = this.normalizeNodes(n.children || []);
            return n;
        });
    }

    private copyNode(node: TreeNode): TreeNode {
        return {
            ...defaults,
            ...node,
        };
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
        const nodeToReturn = this.getNodeInternal(this.allNodes, value);

        if (nodeToReturn) {
            return this.copyNode(nodeToReturn);
        }

        return null;
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

    public updateNodeLabel(value: TreeNode | string, newLabel: string): void {
        if (this.isTreeNode(value)) {
            value.label = newLabel;
        } else {
            const node = this.getNode(value);
            if (node) {
                node.label = newLabel;
            }
        }
    }

    private getParentForNode(nodes: TreeNode[], value: string): TreeNode | null {
        for (const node of nodes) {
            if (node.children && node.children.some((n: TreeNode) => n.value === value)) {
                return node;
            }

            let parent: TreeNode | null = null;
            if (node.children) {
                parent = this.getParentForNode(node.children, value);
            }

            if (parent) {
                return parent;
            }
        }

        return null;
    }

    public filter(searchTerm: string): void {
        if (searchTerm) {
            this.displayedNodes = this.filterNodes(this.allNodes, searchTerm.toLowerCase());
        } else {
            this.displayedNodes = this.normalizeNodes(this.allNodes);
        }
    }

    private filterNodes(nodes: TreeNode[], searchTerm: string): TreeNode[] {
        const filtered: TreeNode[] = [];

        nodes.forEach((n) => {
            const childNodes: TreeNode[] = this.filterNodes(n.children, searchTerm);

            if (n.label.toLowerCase().includes(searchTerm) || childNodes.length > 0) {
                const node = this.copyNode(n);
                node.children = childNodes;

                filtered.push(node);
            }
        });

        return filtered;
    }

    public toggleSelected(nodeContainer: Element, nodeValue: string): void {
        const node = this.getNode(nodeValue);

        if (!node) {
            console.error(`node '${nodeValue}' to toggle not found!`);
            return;
        }

        const selected = !node.selected;

        this.toggleNode(nodeContainer, node, selected);

        if (this.checkboxRecursiveSelect) {
            this.toggleParent(nodeContainer, node);
        }
    }

    private toggleNode(nodeContainer: Element, node: TreeNode, selected: boolean, toggleChildren = true): void {
        const nodeCheckboxDiv: HTMLDivElement | null = nodeContainer.querySelector(
            `#${this.getNodeId(node)} .${constants.classNames.SimpleTreeNodeCheckbox}`
        );

        if (!nodeCheckboxDiv) {
            console.error("checkbox div not found!");
            return;
        }

        node.selected = selected;

        if (node.selected && !nodeCheckboxDiv.classList.contains(constants.classNames.SimpleTreeNodeCheckboxSelected)) {
            nodeCheckboxDiv.classList.add(constants.classNames.SimpleTreeNodeCheckboxSelected);
        } else if (!node.selected && nodeCheckboxDiv.classList.contains(constants.classNames.SimpleTreeNodeCheckboxSelected)) {
            nodeCheckboxDiv.classList.remove(constants.classNames.SimpleTreeNodeCheckboxSelected);
        }

        if (this.checkboxRecursiveSelect && toggleChildren && node.children?.length > 0) {
            node.children.forEach((child: TreeNode) => this.toggleNode(nodeContainer, child, selected));
        }
    }

    private toggleParent(nodeContainer: Element, node: TreeNode): void {
        const parentNode = this.getParentForNode(this.allNodes, node.value);

        if (parentNode && parentNode.children?.length > 0) {
            const selected = parentNode.children.every((node: TreeNode) => node.selected === true);
            this.toggleNode(nodeContainer, parentNode, selected, false);
            this.toggleParent(nodeContainer, parentNode);
        }
    }

    public getNodeId(node: TreeNode): string {
        return constants.nodeIdPrefix + node.value;
    }
}
