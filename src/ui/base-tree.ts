import { TreeConfiguration } from "../types/options";
import { DataService } from "../data/data-service";
import { TreeNode } from "../types/tree-node";

export class BaseTree {
    constructor(public element: HTMLElement, public config: TreeConfiguration, public dataService: DataService) {
        this.renderTree();
    }

    private renderTree(): void {
        const baseUlElement: HTMLUListElement = document.createElement("ul");

        this.dataService.nodes.forEach((node: TreeNode) => {
            const listElement: HTMLLIElement = document.createElement("li");
            listElement.textContent = node.label;
            baseUlElement.appendChild(listElement);

            if (node.children?.length > 0) {
                this.renderChildNodes(node.children, listElement);
            }
        });

        this.element.innerHTML = "";
        this.element.appendChild(baseUlElement);
    }

    private renderChildNodes(childNodes: TreeNode[], parentListElement: HTMLLIElement): void {
        const ulElement: HTMLUListElement = document.createElement("ul");
        childNodes.forEach((childNode: TreeNode) => {
            const childListElement: HTMLLIElement = document.createElement("li");
            childListElement.textContent = childNode.label;
            ulElement.appendChild(childListElement);

            if (childNode.children?.length > 0) {
                this.renderChildNodes(childNode.children, childListElement);
            }
        });

        parentListElement.appendChild(ulElement);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public destroy(): void {}
}
