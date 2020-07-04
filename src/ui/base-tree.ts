import { InternalOptions } from "../types/options";
import { DataService } from "../data/data-service";
import { TreeNode } from "../types/tree-node";
import constants from "./ui-constants";
import { EventManager } from "../event/event";

export class BaseTree {
    private highlightedNode: string | null = null;

    constructor(
        public element: HTMLElement,
        public config: InternalOptions,
        public dataService: DataService,
        private eventManager: EventManager,
        public readOnly: boolean
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public destroy(): void {}

    private onNodeSelect(node: TreeNode): void {
        if (this.config.highlightSelected) {
            this.setHighlighting(node);
        }

        this.eventManager.publish(constants.events.NodeSelected, node);
    }

    public setHighlighting(node: TreeNode): void {
        this.element
            .querySelector(`.${constants.classNames.SimpleTreeNodeText}.${constants.classNames.SimpleTreeNodeBold}`)
            ?.classList.remove(constants.classNames.SimpleTreeNodeBold);

        if (this.highlightedNode !== node.value) {
            this.element
                .querySelector(`#${this.getNodeId(node)}`)
                ?.querySelector(`.${constants.classNames.SimpleTreeNodeText}`)
                ?.classList.add(constants.classNames.SimpleTreeNodeBold);

            this.highlightedNode = node.value;
        } else {
            this.highlightedNode = null;
        }
    }

    public renderContent(): void {
        this.element.innerHTML = "";
        this.createBasicHtml();
        this.renderTree();
    }

    private createBasicHtml(): void {
        const textInput: HTMLInputElement = document.createElement("input");
        textInput.type = "text";
        textInput.autofocus = false;

        textInput.addEventListener("input", (e: Event) => {
            this.dataService.filter((e.target as HTMLInputElement).value);
            this.renderTree();
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

            const lineWrapperDiv = document.createElement("div");
            lineWrapperDiv.classList.add(constants.classNames.SimpleTreeNodeWrapper);

            const textDivElement = document.createElement("div");

            // if (hasChildren) {
            this.addChevronDiv(lineWrapperDiv, node, hasChildren);
            // } else {
            //    textDivElement.classList.add("no-chevron");
            // }

            textDivElement.classList.add(constants.classNames.SimpleTreeNodeText);
            if (this.config.highlightSelected && this.highlightedNode === node.value) {
                textDivElement.classList.add(constants.classNames.SimpleTreeNodeBold);
            }

            textDivElement.textContent = node.label;

            if (node.selectable) {
                textDivElement.addEventListener("click", () => !this.readOnly && this.onNodeSelect(node));
                textDivElement.classList.add(constants.classNames.SimpleTreeNodeSelectable);
            }

            lineWrapperDiv.appendChild(textDivElement);
            liElement.appendChild(lineWrapperDiv);

            ulElement.appendChild(liElement);

            if (!node.collapsed && hasChildren) {
                liElement.appendChild(this.renderUnorderedList(node.children));
            }
        });

        return ulElement;
    }

    private addChevronDiv(divElement: HTMLDivElement, node: TreeNode, hasChildren: boolean): void {
        const chevronDivContainer = document.createElement("div");
        chevronDivContainer.classList.add(constants.classNames.SimpleTreeNodeChevronContainer);

        if (hasChildren) {
            const chevronDiv = document.createElement("div");
            if (node.collapsed) {
                chevronDiv.classList.add(constants.classNames.SimpleTreeNodeChevronRight);
            } else {
                chevronDiv.classList.add(constants.classNames.SimpleTreeNodeChevronDown);
            }

            chevronDivContainer.appendChild(chevronDiv);

            chevronDivContainer.addEventListener("click", () => {
                const flag = !node.collapsed;
                node.collapsed = flag;
                this.collapseNode(node, flag);
                this.renderTree();
            });

            chevronDivContainer.classList.add(constants.classNames.SimpleTreeNodeChevronClickable);
        }

        divElement.appendChild(chevronDivContainer);
    }

    private collapseNode(node: TreeNode, flag: boolean): void {
        node.children.forEach((c) => {
            c.hidden = flag;
            c.children.forEach((c) => this.collapseNode(c, flag));
        });
    }

    private getNodeId(node: TreeNode): string {
        return constants.nodeIdPrefix + node.value;
    }
}
