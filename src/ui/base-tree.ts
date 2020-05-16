import { InternalOptions } from "../types/options";
import { DataService } from "../data/data-service";
import { TreeNode } from "../types/tree-node";
import constants from "./ui-constants";

export class BaseTree {
    private value: TreeNode | null = null;

    constructor(public element: HTMLElement, public config: InternalOptions, public dataService: DataService) {
        this.createBasicHtml();
        this.renderTree();
    }

    public get selectedNode(): TreeNode | null {
        return this.value;
    }

    private getNodeId(node: TreeNode): string {
        return constants.nodeIdPrefix + node.value;
    }

    private selectNode(node: TreeNode): void {
        if (this.value) {
            this.value.selected = false;
            if (this.config.highlightSelected) {
                this.element
                    .querySelector(`#${this.getNodeId(this.value)}`)
                    ?.querySelector(`.${constants.classNames.SimpleTreeNodeText}`)
                    ?.classList.remove(constants.classNames.SimpleTreeNodeBold);
            }
        }

        if (node !== this.value) {
            this.value = node;
            this.value.selected = true;
            if (this.config.highlightSelected) {
                this.element
                    .querySelector(`#${this.getNodeId(this.value)}`)
                    ?.querySelector(`.${constants.classNames.SimpleTreeNodeText}`)
                    ?.classList.add(constants.classNames.SimpleTreeNodeBold);
            }
        } else {
            this.value.selected = false;
            this.value = null;
        }
    }

    private createBasicHtml(): void {
        const textInput: HTMLInputElement = document.createElement("input");
        textInput.type = "text";

        textInput.addEventListener("input", (e: Event) => {
            this.dataService.filter((e.target as HTMLInputElement).value, this.renderTree.bind(this));
        });

        this.element.appendChild(textInput);

        const nodeContainer = document.createElement("div");
        nodeContainer.classList.add(constants.classNames.SimpleTreeNodeContainer);
        this.element.appendChild(nodeContainer);
    }

    private renderTree(): void {
        const nodeContainer = this.element.querySelector(`div.${constants.classNames.SimpleTreeNodeContainer}`);

        if (nodeContainer) {
            nodeContainer.innerHTML = "";
            nodeContainer.appendChild(this.renderUnorderedList(this.dataService.displayedNodes));
        } else {
            console.error("node container not found!");
        }
    }

    private renderUnorderedList(nodes: TreeNode[]): HTMLUListElement {
        const ulElement: HTMLUListElement = document.createElement("ul");
        ulElement.classList.add(constants.classNames.SimpleTreeNodeContainerRoot);

        nodes.forEach((node: TreeNode) => {
            const hasChildren = node.children?.length > 0;
            const liElement: HTMLLIElement = document.createElement("li");
            liElement.id = this.getNodeId(node);

            if (hasChildren) {
                this.addArrowSpan(liElement, node);
            }

            const textSpanElement = document.createElement("span");

            textSpanElement.classList.add(constants.classNames.SimpleTreeNodeText);
            if (this.config.highlightSelected && node.selected) {
                textSpanElement.classList.add(constants.classNames.SimpleTreeNodeBold);
            }

            textSpanElement.textContent = node.label;
            textSpanElement.addEventListener("click", () => {
                this.selectNode(node);
            });

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
        arrowSpan.classList.add(constants.classNames.SimpleTreeNodeArrow);
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
