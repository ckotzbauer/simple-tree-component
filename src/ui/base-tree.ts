import { BaseOptions } from "../types/options";
import { DataService } from "../data/data-service";
import { TreeNode } from "../types/tree-node";
import constants from "./ui-constants";

export class BaseTree {
    private highlightedNode: string | null = null;

    constructor(
        public element: HTMLElement,
        public config: BaseOptions,
        public dataService: DataService,
        public readOnly: boolean,
        private nodeSelectedCallback: (node: TreeNode) => void
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public destroy(): void {}

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

            const lineWrapperDiv = document.createElement("div");
            lineWrapperDiv.classList.add(constants.classNames.SimpleTreeNodeWrapper);

            const textDivElement = document.createElement("div");
            textDivElement.classList.add(constants.classNames.SimpleTreeNodeText);

            this.addChevronDiv(lineWrapperDiv, node, hasChildren);

            if (this.config.treeViewCheckboxes) {
                const checkboxElement = document.createElement("input");
                checkboxElement.type = "checkbox";
                checkboxElement.checked = node.selected;

                if (this.readOnly || !node.selectable) {
                    checkboxElement.disabled = true;
                } else {
                    checkboxElement.addEventListener("input", (e: Event) => {
                        node.selected = (e.target as HTMLInputElement).checked;
                        this.nodeSelectedCallback(node);
                    });
                }

                lineWrapperDiv.appendChild(checkboxElement);
            } else if (node.selected) {
                textDivElement.classList.add(constants.classNames.SimpleTreeNodeBold);
            }

            textDivElement.textContent = node.label;

            if (!this.config.treeViewCheckboxes && node.selectable) {
                textDivElement.addEventListener("click", () => !this.readOnly && this.nodeSelectedCallback(node));
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
