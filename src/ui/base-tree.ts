import { BaseOptions } from "../types/options";
import { DataService } from "../data/data-service";
import { TreeNode } from "../types/tree-node";
import constants from "./ui-constants";
import { EventManager } from "../event/event-manager";

export class BaseTree {
    private highlightedNode: string | null = null;

    constructor(
        public element: HTMLElement,
        public config: BaseOptions,
        public dataService: DataService,
        private eventManager: EventManager,
        public readOnly: boolean
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public destroy(): void {}

    public setHighlighting(node: TreeNode | null): void {
        this.element
            .querySelector(`.${constants.classNames.SimpleTreeNodeWrapper}.${constants.classNames.SimpleTreeNodeSelected}`)
            ?.classList.remove(constants.classNames.SimpleTreeNodeSelected);

        if (node !== null && this.highlightedNode !== node.value) {
            document
                .getElementById(node.uid)
                ?.querySelector(`.${constants.classNames.SimpleTreeNodeWrapper}`)
                ?.classList.add(constants.classNames.SimpleTreeNodeSelected);

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
        if (this.config.searchBar) {
            const wrapperDiv: HTMLDivElement = document.createElement("div");
            wrapperDiv.classList.add(constants.classNames.SimpleTreeInputContainer);

            const textInput: HTMLInputElement = document.createElement("input");
            textInput.type = "text";

            if (this.config.searchBarFocus) {
                setTimeout(() => textInput.focus(), 0);
            }

            textInput.addEventListener("input", (e: Event) => {
                this.dataService.filter((e.target as HTMLInputElement).value);
                this.renderTree();
            });

            wrapperDiv.appendChild(textInput);
            this.element.appendChild(wrapperDiv);
        }

        const nodeContainer = document.createElement("div");
        nodeContainer.classList.add(constants.classNames.SimpleTreeNodeContainer);
        this.element.appendChild(nodeContainer);
    }

    private getNodeContainer(): Element | null {
        const container = this.element.querySelector(`div.${constants.classNames.SimpleTreeNodeContainer}`);

        if (!container) {
            console.error("node container not found!");
        }

        return container;
    }

    private renderTree(): void {
        const nodeContainer = this.getNodeContainer();

        if (nodeContainer) {
            nodeContainer.innerHTML = "";
            nodeContainer.appendChild(this.renderUnorderedList(this.dataService.displayedNodes));
        }
    }

    private renderUnorderedList(nodes: TreeNode[]): HTMLUListElement {
        const ulElement: HTMLUListElement = document.createElement("ul");
        ulElement.classList.add(constants.classNames.SimpleTreeNodeContainerRoot);

        nodes.forEach((node: TreeNode) => {
            const hasChildren = node.children?.length > 0;
            const liElement: HTMLLIElement = document.createElement("li");
            liElement.id = node.uid;

            const lineWrapperDiv = document.createElement("div");
            lineWrapperDiv.classList.add(constants.classNames.SimpleTreeNodeWrapper);

            const textDivElement = document.createElement("div");
            textDivElement.classList.add(constants.classNames.SimpleTreeNodeText);

            this.addChevronDiv(lineWrapperDiv, node, hasChildren);

            if (this.config.treeViewCheckboxes) {
                const checkboxElement = document.createElement("div");
                checkboxElement.classList.add(constants.classNames.SimpleTreeNodeCheckbox);

                if (this.readOnly || !node.selectable) {
                    checkboxElement.classList.add(constants.classNames.SimpleTreeNodeCheckboxDisabled);
                } else {
                    checkboxElement.addEventListener("click", () => this.toggleCheckboxSelected(node));
                }

                if (node.selected) {
                    checkboxElement.classList.add(constants.classNames.SimpleTreeNodeCheckboxSelected);
                }

                lineWrapperDiv.appendChild(checkboxElement);
            } else if (node.selected) {
                textDivElement.classList.add(constants.classNames.SimpleTreeNodeSelected);
            }

            textDivElement.textContent = node.label;

            if (!this.config.treeViewCheckboxes && node.selectable && !this.readOnly) {
                lineWrapperDiv.addEventListener("click", () => this.toggleNodeSelected(node));
                lineWrapperDiv.classList.add(constants.classNames.SimpleTreeNodeSelectable);
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

    private toggleNodeSelected(node: TreeNode): void {
        const mutatedNode = this.dataService.toggleNodeSelected(node.value);
        this.eventManager.publish(constants.events.NodeSelected, mutatedNode);
    }

    private toggleCheckboxSelected(node: TreeNode): void {
        const nodeContainer = this.getNodeContainer();

        if (!nodeContainer) {
            return;
        }

        const mutatedNode = this.dataService.toggleCheckboxSelected(node.value);
        this.eventManager.publish(constants.events.NodeSelected, mutatedNode);
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

            chevronDivContainer.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
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
}
