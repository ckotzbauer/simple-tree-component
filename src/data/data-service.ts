import { TreeNode, defaults, InitTreeNode } from "../types/tree-node";
import { isDuplicateNodeValue, isTreeNodeValid } from "../validation/validation";
import constants from "../ui/ui-constants";
import { SearchMode } from "types/options";

export class DataService {
    private allNodes: TreeNode[] = [];
    public displayedNodes: TreeNode[] = [];
    private treeInstanceId: number;

    constructor(
        displayedNodes: InitTreeNode[] = [],
        private checkboxesActive: boolean = false,
        private checkboxesRecursive: boolean = false
    ) {
        this.treeInstanceId = Math.floor(1000 + Math.random() * 9000);
        this.displayedNodes = this.normalizeNodes(displayedNodes);
        this.allNodes = this.displayedNodes;
    }

    private normalizeNodes(nodes: InitTreeNode[]): TreeNode[] {
        return nodes.filter((node: InitTreeNode) => !!node).map((node: InitTreeNode) => this.normalizeNode(node));
    }

    private normalizeNode(node: InitTreeNode): TreeNode {
        const n = this.copyNode(node);
        n.uid = this.generateUid(node.value as string);
        this.mutateNode(n);
        n.children = this.normalizeNodes(n.children || []);
        return n;
    }

    private mutateNode(node: InitTreeNode): void {
        if (!node.selectable && node.selected) {
            node.selected = false;
        }
    }

    private copyNode(node: InitTreeNode): TreeNode {
        return {
            ...defaults,
            ...node,
        } as TreeNode;
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

    public addNode(node: InitTreeNode, parent: TreeNode | string | null = null): void {
        if (!isTreeNodeValid(node) || isDuplicateNodeValue(this.allNodes, node.value)) {
            throw new Error("node value is invalid or node with value already exists!");
        }

        const n: TreeNode = this.normalizeNode(node);

        if (parent && this.isTreeNode(parent)) {
            parent.children.push(n);
        } else if (typeof parent === "string") {
            const parentNode: TreeNode | null = this.getNodeInternal(this.allNodes, parent);

            if (this.isTreeNode(parentNode)) {
                parentNode.children.push(n);
            }
        } else {
            this.allNodes.push(n);
        }
    }

    public moveNode(node: TreeNode | string, direction: "up" | "down"): void {
        if (!node) {
            return;
        }

        const nodeValue = this.isTreeNode(node) ? node.value : node;
        const nodeList: TreeNode[] | undefined = this.allNodes.some((n) => n.value === nodeValue)
            ? this.allNodes
            : this.getParentForNode(this.allNodes, nodeValue)?.children || this.allNodes;
        const nodeIndex: number = nodeList.findIndex((n: TreeNode) => n.value === nodeValue);

        if (direction === "up" && nodeIndex > 0) {
            const tempNode: TreeNode = nodeList[nodeIndex];
            nodeList[nodeIndex] = nodeList[nodeIndex - 1];
            nodeList[nodeIndex - 1] = tempNode;
        } else if (direction === "down" && nodeIndex < nodeList.length - 1) {
            const tempNode: TreeNode = nodeList[nodeIndex];
            nodeList[nodeIndex] = nodeList[nodeIndex + 1];
            nodeList[nodeIndex + 1] = tempNode;
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

    public updateNodeLabel(value: string, newLabel: string): void {
        const node = this.getNodeInternal(this.allNodes, value);
        if (node) {
            node.label = newLabel;
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

    public getFlattedClickableNodeValues(): string[] {
        return this.flatten(this.displayedNodes)
            .filter((node: TreeNode) => node.selectable && !node.hidden)
            .map((n: TreeNode) => n.value);
    }

    private flatten(nodes: TreeNode[]): TreeNode[] {
        return nodes.reduce<TreeNode[]>((acc, e) => {
            if (e.children.length > 0) {
                acc.push(e);
                return acc.concat(this.flatten(e.children));
            } else {
                return acc.concat(e);
            }
        }, []);
    }

    public filter(searchTerm: string, searchMode: SearchMode): void {
        if (searchTerm) {
            this.displayedNodes = this.filterNodes(this.allNodes, false, searchTerm.toLowerCase(), searchMode);
        } else {
            this.displayedNodes = this.normalizeNodes(this.allNodes);
        }
    }

    private filterNodes(nodes: TreeNode[], parentMatch: boolean, searchTerm: string, searchMode: SearchMode): TreeNode[] {
        const filtered: TreeNode[] = [];

        nodes.forEach((n) => {
            const textOrParentMatch =
                searchMode === "OnlyMatches"
                    ? n.label?.toLowerCase().includes(searchTerm)
                    : n.label?.toLowerCase().includes(searchTerm) || parentMatch;

            const childNodes: TreeNode[] = this.filterNodes(n.children, textOrParentMatch, searchTerm, searchMode);

            if (textOrParentMatch || childNodes.length > 0) {
                const node = this.copyNode(n);
                node.children = childNodes;

                filtered.push(node);
            }
        });

        return filtered;
    }

    public setSelected(...nodes: TreeNode[]): void {
        const values = nodes.map((n) => n.value);
        this.setSelectedNodes(this.allNodes, values);

        if (this.checkboxesActive && this.checkboxesRecursive) {
            this.cleanRecursiveSelection(this.allNodes);
        }
    }

    private updateCheckboxState(node: TreeNode): void {
        if (!this.checkboxesActive) {
            return;
        }

        const checkboxDiv: HTMLDivElement | null | undefined = document
            .getElementById(node.uid)
            ?.querySelector(`.${constants.classNames.SimpleTreeNodeCheckbox}`);

        if (!checkboxDiv) {
            console.error("checkbox div not found for node!", node);
            return;
        }

        if (checkboxDiv) {
            if (node.selected && !checkboxDiv.classList.contains(constants.classNames.SimpleTreeNodeCheckboxSelected)) {
                checkboxDiv.classList.add(constants.classNames.SimpleTreeNodeCheckboxSelected);
            } else if (!node.selected && checkboxDiv.classList.contains(constants.classNames.SimpleTreeNodeCheckboxSelected)) {
                checkboxDiv.classList.remove(constants.classNames.SimpleTreeNodeCheckboxSelected);
            }
        }
    }

    private setSelectedNodes(nodes: TreeNode[], values: string[]): void {
        nodes.forEach((n: TreeNode) => {
            if (this.checkboxesRecursive || n.selectable) {
                n.selected = values.includes(n.value);
                this.updateCheckboxState(n);
            }

            if (n.children && n.children.length > 0) {
                this.setSelectedNodes(n.children, values);
            }
        });
    }

    private cleanRecursiveSelection(nodes: TreeNode[]): boolean {
        let allNodesSelected = true;
        nodes.forEach((n: TreeNode) => {
            if (n.children && n.children.length > 0) {
                if (n.selected) {
                    this.checkRecursiveChilds(n.children);
                } else {
                    n.selected = this.cleanRecursiveSelection(n.children);
                    this.updateCheckboxState(n);
                }
            }

            allNodesSelected = allNodesSelected && n.selected;
        });

        return allNodesSelected;
    }

    private checkRecursiveChilds(nodes: TreeNode[]): void {
        nodes.forEach((n: TreeNode) => {
            n.selected = true;
            this.updateCheckboxState(n);

            if (n.children && n.children.length > 0) {
                this.checkRecursiveChilds(n.children);
            }
        });
    }

    public getSelected(): TreeNode[] {
        return this.getSelectedInternal(this.allNodes).map(this.copyNode);
    }

    private getSelectedInternal(nodes: TreeNode[], filtered: TreeNode[] = []): TreeNode[] {
        nodes.forEach((n) => {
            if (n.selected) {
                filtered.push(n);
            }

            if (n.children && n.children.length > 0) {
                filtered = this.getSelectedInternal(n.children, filtered);
            }
        });

        return filtered;
    }

    public toggleNodeSelected(nodeValue: string): TreeNode | null {
        const node = this.getNodeInternal(this.allNodes, nodeValue);

        if (!node) {
            console.error(`node '${nodeValue}' to toggle not found!`);
            return null;
        }

        node.selected = !node.selected;
        return this.copyNode(node);
    }

    public toggleCheckboxSelected(nodeValue: string): TreeNode | null {
        let node = this.getNodeInternal(this.allNodes, nodeValue);

        if (!node) {
            console.error(`checkbox node '${nodeValue}' to toggle not found!`);
            return null;
        }

        const selected = !node.selected;

        node = this.toggleCheckboxNode(node, selected);

        if (this.checkboxesRecursive) {
            this.toggleCheckboxParent(node);
        }

        return this.copyNode(node);
    }

    private toggleCheckboxNode(node: TreeNode, selected: boolean, toggleChildren = true): TreeNode {
        const nodeCheckboxDiv: HTMLDivElement | null | undefined = document
            .getElementById(node.uid)
            ?.querySelector(`.${constants.classNames.SimpleTreeNodeCheckbox}`);

        if (!nodeCheckboxDiv) {
            console.error("checkbox div not found!");
            return node;
        }

        node.selected = selected;

        if (node.selected && !nodeCheckboxDiv.classList.contains(constants.classNames.SimpleTreeNodeCheckboxSelected)) {
            nodeCheckboxDiv.classList.add(constants.classNames.SimpleTreeNodeCheckboxSelected);
        } else if (!node.selected && nodeCheckboxDiv.classList.contains(constants.classNames.SimpleTreeNodeCheckboxSelected)) {
            nodeCheckboxDiv.classList.remove(constants.classNames.SimpleTreeNodeCheckboxSelected);
        }

        if (this.checkboxesRecursive && toggleChildren && node.children?.length > 0) {
            node.children.forEach((child: TreeNode) => this.toggleCheckboxNode(child, selected));
        }

        return node;
    }

    private toggleCheckboxParent(node: TreeNode): void {
        const parentNode = this.getParentForNode(this.allNodes, node.value);

        if (parentNode && parentNode.children?.length > 0) {
            const selected = parentNode.children.every((node: TreeNode) => node.selected === true);
            this.toggleCheckboxNode(parentNode, selected, false);
            this.toggleCheckboxParent(parentNode);
        }
    }

    private generateUid(value: string): string {
        let hash = 0;
        for (let i = 0; i < value.length; i++) {
            const chr = value.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }

        return `${this.treeInstanceId}-${Math.abs(hash)}`;
    }
}
