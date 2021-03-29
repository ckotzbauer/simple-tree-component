import { BaseOptions } from "../types/options";
import { DataService } from "../data/data-service";
import { TreeNode } from "../types/tree-node";
import constants from "./ui-constants";
import { EventManager } from "../event/event-manager";
import { KeyEventHandler } from "./key-event-handler";

export class BaseTree {
    private highlightedNode: string | null = null;
    private hoveredNode: string | null = null;

    private searchTextInput: HTMLInputElement | null = null;

    private keyEventHandler: KeyEventHandler;

    constructor(
        public element: HTMLElement,
        public config: BaseOptions,
        public dataService: DataService,
        private eventManager: EventManager,
        private readOnly: boolean
    ) {
        this.keyEventHandler = new KeyEventHandler(this.eventManager, this.dataService);
        this.eventManager.subscribe(constants.events.HoverChanged, (n: TreeNode | null) => this.hoverNode(n));
    }

    public destroy(): void {
        this.deactivateKeyListener();
    }

    public activateKeyListener(): void {
        this.keyEventHandler.initialize();
    }

    public deactivateKeyListener(): void {
        this.keyEventHandler.destroy();
    }

    private setNodeUiState(node: TreeNode | null, current: string | null, cssClass: string): string | null {
        this.element.querySelector(`.${constants.classNames.SimpleTreeNodeWrapper}.${cssClass}`)?.classList.remove(cssClass);

        if (node !== null && current !== node.value) {
            document
                .getElementById(node.uid)
                ?.querySelector(`.${constants.classNames.SimpleTreeNodeWrapper}`)
                ?.classList.add(cssClass);

            return node.value;
        }

        return null;
    }

    public highlightNode(node: TreeNode | null): void {
        this.highlightedNode = this.setNodeUiState(node, this.highlightedNode, constants.classNames.SimpleTreeNodeSelected);
    }

    private hoverNode(node: TreeNode | null) {
        this.hoveredNode = this.setNodeUiState(node, this.hoveredNode, constants.classNames.SimpleTreeNodeHovered);
        this.keyEventHandler.setHoveredNodeValue(this.hoveredNode);
    }

    public renderContent(): void {
        this.element.innerHTML = "";
        this.createBasicHtml();
        this.dataService.filter(""); // reset potential filter
        this.renderTree();
    }

    private createBasicHtml(): void {
        if (this.config.searchBar) {
            const wrapperDiv: HTMLDivElement = document.createElement("div");
            wrapperDiv.classList.add(constants.classNames.SimpleTreeInputContainer);

            this.searchTextInput = document.createElement("input");
            this.searchTextInput.type = "text";

            if (this.config.searchBarFocus) {
                setTimeout(() => this.searchTextInput?.focus(), 0);
            }

            this.searchTextInput.addEventListener("input", (e: Event) => {
                this.dataService.filter((e.target as HTMLInputElement).value);
                this.renderTree();
                this.eventManager.publish(constants.events.FilterChanged);
            });

            wrapperDiv.appendChild(this.searchTextInput);
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
            lineWrapperDiv.addEventListener("mouseover", () => this.hoverNode(node));
            lineWrapperDiv.addEventListener("mouseout", () => this.hoverNode(null));

            const textDivElement = document.createElement("div");
            textDivElement.classList.add(constants.classNames.SimpleTreeNodeText);

            this.addChevronDiv(lineWrapperDiv, node, hasChildren);

            if (this.config.checkboxes.active) {
                const checkboxElement = document.createElement("div");
                checkboxElement.classList.add(constants.classNames.SimpleTreeNodeCheckbox);

                if (this.readOnly || (!this.config.checkboxes.recursive && !node.selectable)) {
                    checkboxElement.classList.add(constants.classNames.SimpleTreeNodeCheckboxDisabled);
                } else {
                    checkboxElement.addEventListener("click", () => this.toggleCheckboxSelected(node));
                }

                if (node.selected) {
                    checkboxElement.classList.add(constants.classNames.SimpleTreeNodeCheckboxSelected);
                }

                lineWrapperDiv.appendChild(checkboxElement);
            } else if (node.selected) {
                lineWrapperDiv.classList.add(constants.classNames.SimpleTreeNodeSelected);
            }

            textDivElement.textContent = node.label;

            if (!this.config.checkboxes.active && node.selectable && !this.readOnly) {
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

        if (nodes.length === 0) {
            const liElement: HTMLLIElement = document.createElement("li");
            const lineWrapperDiv = document.createElement("div");
            lineWrapperDiv.classList.add(constants.classNames.SimpleTreeNodeWrapper);

            const textDivElement = document.createElement("div");
            textDivElement.classList.add(constants.classNames.SimpleTreeNodeText);
            textDivElement.textContent = this.config.noNodesMessage;

            lineWrapperDiv.appendChild(textDivElement);
            liElement.appendChild(lineWrapperDiv);
            ulElement.appendChild(liElement);
        }

        return ulElement;
    }

    private toggleNodeSelected(node: TreeNode): void {
        const mutatedNode = this.dataService.toggleNodeSelected(node.value);
        this.eventManager.publish(constants.events.NodeSelected, mutatedNode);
    }

    private toggleCheckboxSelected(node: TreeNode): void {
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

    public setReadOnly(readOnly: boolean): void {
        this.readOnly = readOnly;

        if (this.searchTextInput) {
            this.searchTextInput.disabled = readOnly;
        }
    }
}
