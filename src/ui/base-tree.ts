import { TreeConfiguration } from "../types/options";
import { DataService } from "../data/data-service";
import { TreeNode } from "../types/tree-node";

export class BaseTree {
    constructor(public element: HTMLElement, public config: TreeConfiguration, public dataService: DataService) {
        this.renderTree();
    }

    private renderTree(): void {
        this.element.innerHTML = "";
        this.element.appendChild(this.renderUnorderedList(this.dataService.nodes));
    }

    private renderUnorderedList(nodes: TreeNode[]): HTMLUListElement {
        const ulElement: HTMLUListElement = document.createElement("ul");
        nodes.forEach((node: TreeNode) => {
            const liElement: HTMLLIElement = document.createElement("li");
            liElement.textContent = node.label;
            ulElement.appendChild(liElement);

            if (node.children?.length > 0) {
                liElement.appendChild(this.renderUnorderedList(node.children));
            }
        });

        return ulElement;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public destroy(): void {}
}
