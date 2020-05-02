import { TreeConfiguration } from "../types/options";
import { DataService } from "../data/data-service";
import { TreeNode } from "../types/tree-node";

export class BaseTree {
    constructor(public element: HTMLElement, public config: TreeConfiguration, public dataService: DataService) {
        this.createBasicHtml();
        this.renderTree();
    }

    private createBasicHtml(): void {
        const textInput: HTMLInputElement = document.createElement("input");
        textInput.type = "text";

        textInput.addEventListener("input", (e: Event) => {
            this.dataService.filter((e.target as HTMLInputElement).value, this.renderTree.bind(this));
        });

        this.element.appendChild(textInput);

        const nodeContainer = document.createElement("div");
        nodeContainer.classList.add("simple-tree-node-container");
        this.element.appendChild(nodeContainer);
    }

    private renderTree(): void {
        const nodeContainer = this.element.querySelector("div.simple-tree-node-container");

        if (nodeContainer) {
            nodeContainer.innerHTML = "";
            nodeContainer.appendChild(this.renderUnorderedList(this.dataService.displayedNodes));
        } else {
            console.error("node container not found!");
        }
    }

    private renderUnorderedList(nodes: TreeNode[]): HTMLUListElement {
        const ulElement: HTMLUListElement = document.createElement("ul");
        ulElement.style.listStyle = "none";
        nodes.forEach((node: TreeNode) => {
            const hasChildren = node.children?.length > 0;
            const liElement: HTMLLIElement = document.createElement("li");

            if (hasChildren) {
                this.addArrowSpan(liElement, node);
            }

            const textSpanElement = document.createElement("span");
            textSpanElement.classList.add("simple-tree-node-text");
            textSpanElement.textContent = node.label;
            liElement.appendChild(textSpanElement);

            ulElement.appendChild(liElement);

            if (!node.collapsed && hasChildren) {
                liElement.appendChild(this.renderUnorderedList(node.children));
            }
        });

        return ulElement;
    }

    private addArrowSpan(liElement: HTMLLIElement, node: TreeNode): void {
        const arrowSpan = document.createElement("span");
        arrowSpan.classList.add("simple-tree-node-arrow");
        arrowSpan.textContent = node.collapsed ? ">" : "v";

        arrowSpan.addEventListener("click", () => {
            const flag = !node.collapsed;
            node.collapsed = flag;
            this.collapseNode(node, flag);
            this.renderTree();
        });

        liElement.appendChild(arrowSpan);
    }

    private collapseNode(node: TreeNode, flag: boolean): void {
        node.children.forEach((c) => {
            c.hidden = flag;
            c.children.forEach((c) => this.collapseNode(c, flag));
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public destroy(): void {}
}
