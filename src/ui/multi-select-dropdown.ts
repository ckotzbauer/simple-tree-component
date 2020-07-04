import { DataService } from "../data/data-service";
import { BaseOptions } from "../types/options";
import { Instance } from "../types/instance";
import { BaseTree } from "./base-tree";
import { TreeNode } from "../types/tree-node";
import { createContainer, createDropdownContainer, createUnorderedList, createListItem } from "./utils";
import constants from "./ui-constants";
import { calculateOverlayPlacement } from "./overlay-placement";
import { EventManager } from "../event/event";
import { Subscription } from "../types/subscription";

export class MultiSelectDropdown implements Instance<"multiSelectDropdown"> {
    private dataService: DataService;
    private tree: BaseTree;
    private eventManager: EventManager;

    private readOnly = false;
    private selected: TreeNode[] = [];
    private dropdownOpen = false;

    private rootContainer!: HTMLElement;
    private dropdownHolder!: HTMLElement;
    private selectContainer!: HTMLElement;
    private pillboxContainer!: HTMLElement;
    private arrowElement!: HTMLElement;

    constructor(private element: HTMLElement, public options: BaseOptions) {
        this.rootContainer = createContainer(element, constants.classNames.SimpleTree);

        this.dataService = new DataService(options.nodes);
        this.eventManager = new EventManager();

        this.dropdownHolder = createDropdownContainer(options.css.dropdownHolder);
        this.tree = new BaseTree(this.dropdownHolder, options, this.dataService, this.eventManager, this.readOnly);
        this.subscribe(constants.events.NodeSelected, (n: TreeNode) => this.nodeSelected(n));
        this.renderSelectField(this.rootContainer);
    }

    /////////////////////////////// PUBLIC API ///////////////////////////////

    public destroy(): void {
        this.tree.destroy();
        Array.from(this.element.children).forEach((e: Element) => this.element.removeChild(e));

        this.dataService.clear();
    }

    public setSelected(value: TreeNode[]): void {
        this.selected = value;
        this.renderPillboxes();
    }

    public getSelected(): TreeNode[] {
        return this.selected;
    }

    public setReadOnly(readOnly: boolean): void {
        this.readOnly = readOnly;
        this.tree.readOnly = readOnly;
        this.rootContainer.classList.toggle(constants.classNames.SimpleTreeReadOnly, readOnly);

        if (readOnly && this.dropdownOpen) {
            this.closeDropdown();
        }
    }

    public showEmphasizeIcon(): void {
        throw new Error("Feature not supported in multi-select-mode!");
    }

    public hideEmphasizeIcon(): void {
        throw new Error("Feature not supported in multi-select-mode!");
    }

    public subscribe(event: string, handler: (d: any, e: string) => void): Subscription {
        return this.eventManager.subscribe(event, handler);
    }

    public subscribeOnce(event: string, handler: (d: any, e: string) => void): Subscription {
        return this.eventManager.subscribeOnce(event, handler);
    }

    //////////////////////////////////////////////////////////////////////////

    private nodeSelected(node: TreeNode): void {
        const index = this.selected.findIndex((s) => s.value === node.value);
        if (index !== -1) {
            node.selected = false;
            this.selected.splice(index, 1);
        } else {
            node.selected = true;
            this.selected.push(node);
        }

        this.renderPillboxes();
        this.closeDropdown();
        this.eventManager.publish(constants.events.SelectionChanged, this.selected);
    }

    private renderSelectField(container: HTMLElement): void {
        this.selectContainer = createContainer(container, constants.classNames.SimpleTreeMultiSelectBox);
        this.selectContainer.onclick = () => !this.readOnly && this.toggleDropdown();

        this.pillboxContainer = createUnorderedList(this.selectContainer, constants.classNames.SimpleTreePillboxHolder);
        this.renderPillboxes();

        this.arrowElement = document.createElement("i");
        this.arrowElement.classList.add(constants.classNames.SimpleTreeChevronDown);
        this.selectContainer.appendChild(this.arrowElement);
    }

    private renderPillboxes(): void {
        this.pillboxContainer.innerHTML = "";
        this.selected.forEach((item: TreeNode) => {
            const listItem = createListItem(this.pillboxContainer, "");
            listItem.innerText = this.options.templateSelectedText(item);

            const arrow: HTMLElement = createContainer(listItem, constants.classNames.SimpleTreePillboxCross);
            arrow.addEventListener("click", () => !this.readOnly && this.nodeSelected(item));
        });
    }

    private toggleDropdown(): void {
        if (this.dropdownOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    private openDropdown(): void {
        if (this.readOnly) {
            return;
        }

        this.dropdownHolder.style.display = "inherit";
        this.tree.renderContent();
        calculateOverlayPlacement(this.dropdownHolder, this.selectContainer);
        this.arrowElement.classList.remove(constants.classNames.SimpleTreeChevronDown);
        this.arrowElement.classList.add(constants.classNames.SimpleTreeChevronUp);
        this.dropdownOpen = true;
    }

    private closeDropdown(): void {
        this.dropdownHolder.style.display = "none";
        this.dropdownHolder.style.top = ``;
        this.dropdownHolder.style.left = ``;
        this.dropdownHolder.style.width = ``;
        this.dropdownHolder.style.height = ``;
        this.arrowElement.classList.remove(constants.classNames.SimpleTreeChevronUp);
        this.arrowElement.classList.add(constants.classNames.SimpleTreeChevronDown);
        this.dropdownOpen = false;
    }
}
