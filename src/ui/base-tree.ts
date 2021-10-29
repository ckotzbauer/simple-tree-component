import { BaseOptions } from "../types/options";
import { DataService } from "../data/data-service";
import { TreeNode } from "../types/tree-node";
import constants from "./ui-constants";
import { EventManager } from "../event/event-manager";
import { KeyEventHandler } from "./key-event-handler";
import { escape, escapeRegex } from "./utils";
import { Subscription } from "typings";

export class BaseTree {
    private highlightedNode: string | null = null;
    private hoveredNode: string | null = null;

    private searchTextInput: HTMLInputElement | null = null;
    private searchTextInputEvent: ((e: Event) => void) | null = null;

    private keyEventHandler: KeyEventHandler;
    private subscription: Subscription | null;

    constructor(
        public element: HTMLElement,
        public config: BaseOptions,
        public dataService: DataService,
        private eventManager: EventManager,
        private readOnly: boolean
    ) {
        this.keyEventHandler = new KeyEventHandler(this.eventManager, this.dataService, this.readOnly);
        this.subscription = this.eventManager.subscribe(constants.events.HoverChanged, (n: TreeNode | null) => this.hoverNode(n));
    }

    public destroy(): void {
        this.deactivateKeyListener();

        if (this.subscription) {
            this.subscription.dispose();
            this.subscription = null;
        }

        const nodeContainer = this.getNodeContainer();
        if (nodeContainer) {
            nodeContainer.innerHTML = "";
        }

        if (this.searchTextInput && this.searchTextInputEvent) {
            this.searchTextInput.removeEventListener("input", this.searchTextInputEvent);
            this.searchTextInputEvent = null;
        }
    }

    public activateKeyListener(): void {
        this.keyEventHandler.initialize();
    }

    public deactivateKeyListener(): void {
        this.keyEventHandler.destroy();
    }

    private setNodeUiState(node: TreeNode | null, current: string | null, cssClass: string): string | null {
        if (!node || current !== node.value) {
            this.element.querySelector(`.${constants.classNames.SimpleTreeNodeWrapper}.${cssClass}`)?.classList.remove(cssClass);
        }

        if (node !== null) {
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
        this.dataService.filter("", this.config.searchMode); // reset potential filter
        this.renderTree();
    }

    private createBasicHtml(): void {
        if (this.config.searchBar) {
            const wrapperDiv: HTMLDivElement = document.createElement("div");
            wrapperDiv.classList.add(constants.classNames.SimpleTreeInputContainer);

            this.searchTextInput = document.createElement("input");
            this.searchTextInput.type = "text";
            this.searchTextInput.placeholder = this.config.searchPlaceholder;

            if (this.config.searchBarFocus) {
                setTimeout(() => this.searchTextInput?.focus(), 0);
            }

            this.searchTextInputEvent = (e: Event) => {
                this.dataService.filter((e.target as HTMLInputElement).value, this.config.searchMode);
                this.renderTree();
                this.eventManager.publish(constants.events.FilterChanged);
            };

            this.searchTextInput.addEventListener("input", this.searchTextInputEvent);
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

    public renderTree(): void {
        const nodeContainer = this.getNodeContainer();

        if (nodeContainer) {
            nodeContainer.innerHTML = "";
            nodeContainer.appendChild(this.renderUnorderedList(this.dataService.allNodes));
        }
    }

    private renderUnorderedList(nodes: TreeNode[]): HTMLUListElement {
        const ulElement: HTMLUListElement = document.createElement("ul");
        ulElement.classList.add(constants.classNames.SimpleTreeNodeContainerRoot);

        let highlightRegex: RegExp | null = null;

        if (this.searchTextInput?.value && this.config.highlightSearchResults) {
            highlightRegex = new RegExp(`(${escapeRegex(this.searchTextInput?.value)})`, "ig");
        }

        nodes.forEach((node: TreeNode) => {
            if (node.hidden) {
                return;
            }

            const hasChildren = node.children?.length > 0;
            const liElement: HTMLLIElement = document.createElement("li");
            liElement.id = node.uid;

            const lineWrapperDiv = document.createElement("div");
            lineWrapperDiv.classList.add(constants.classNames.SimpleTreeNodeWrapper);
            lineWrapperDiv.addEventListener("mouseover", () => this.hoverNode(node));
            lineWrapperDiv.addEventListener("mouseout", () => this.hoverNode(null));

            if (node.cssClass) {
                lineWrapperDiv.classList.add(node.cssClass);
            }

            if (hasChildren) {
                lineWrapperDiv.classList.add(constants.classNames.SimpleTreeParentNode);
            }

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

            textDivElement.innerHTML = this.formatNodeLabel(node.label, highlightRegex);

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
        this.eventManager.publish(constants.events._NodeSelected, mutatedNode);
    }

    private toggleCheckboxSelected(node: TreeNode): void {
        const mutatedNode = this.dataService.toggleCheckboxSelected(node.value);
        this.eventManager.publish(constants.events._NodeSelected, mutatedNode);
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
                this.collapseNode(node, flag);
            });

            chevronDivContainer.classList.add(constants.classNames.SimpleTreeNodeChevronClickable);
        }

        divElement.appendChild(chevronDivContainer);
    }

    public collapseNode(node: TreeNode, flag: boolean, render = true): void {
        if (!node || node.hidden || node.children?.length === 0) {
            return;
        }

        node.collapsed = this.dataService.collapseNode(node.value, flag);

        if (render) {
            this.renderTree();
        }
    }

    public collapseAllNodes(flag: boolean): void {
        this.dataService.getAllNodes().forEach((t) => this.collapseNode(t, flag, false));
        this.renderTree();
    }

    public setReadOnly(readOnly: boolean): void {
        this.readOnly = readOnly;

        if (this.searchTextInput) {
            this.searchTextInput.disabled = readOnly;
        }

        this.keyEventHandler.setReadOnly(readOnly);
    }

    private formatNodeLabel(text: string, highlightRegex: RegExp | null): string {
        if (highlightRegex) {
            return escape(text).replace(highlightRegex, (match: string): string => `<em>${match}</em>`);
        }

        return escape(text);
    }
}
