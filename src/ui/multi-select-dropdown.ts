import { DataService } from "../data/data-service";
import { InternalOptions } from "../types/options";
import { Instance } from "../types/instance";
import { BaseTree } from "./base-tree";
import { TreeNode } from "../types/tree-node";
import { createContainer, createDropdownContainer, createUnorderedList, createListItem } from "./utils";
import constants from "./ui-constants";
import { calculateOverlayPlacement } from "./overlay-placement";

export class MultiSelectDropdown implements Instance<"multiSelectDropdown"> {
    private dataService: DataService;
    private tree: BaseTree;
    private dropdownOpen = false;
    public selected: TreeNode[] = [];

    private dropdownHolder!: HTMLElement;
    private selectContainer!: HTMLElement;
    private pillboxContainer!: HTMLElement;
    private arrowElement!: HTMLElement;

    constructor(private element: HTMLElement, public options: InternalOptions) {
        const container: HTMLElement = createContainer(element, constants.classNames.SimpleTree);

        this.dataService = new DataService(options.nodes);

        this.dropdownHolder = createDropdownContainer(options.css.dropdownHolder);
        this.tree = new BaseTree(this.dropdownHolder, options, this.dataService, this.nodeSelected.bind(this));
        this.renderSelectField(container);
    }

    public destroy(): void {
        this.tree.destroy();
        Array.from(this.element.children).forEach((e: Element) => this.element.removeChild(e));

        this.dataService.clear();
    }

    private nodeSelected(node: TreeNode): void {
        const index = this.selected.findIndex((s) => s.value === node.value);
        if (index !== -1) {
            this.selected.splice(index, 1);
        } else {
            this.selected.push(node);
        }

        this.renderPillboxes();
        this.closeDropdown();
    }

    public setSelected(value: TreeNode[]): void {
        this.selected = value;
        this.renderPillboxes();
    }

    private renderSelectField(container: HTMLElement): void {
        this.selectContainer = createContainer(container, constants.classNames.SimpleTreeMultiSelectBox);
        this.selectContainer.onclick = () => this.toggleDropdown();

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
            arrow.addEventListener("click", () => this.nodeSelected(item));
        });
    }

    private toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen;

        if (this.dropdownOpen) {
            this.openDropdown();
        } else {
            this.closeDropdown();
        }
    }

    private openDropdown(): void {
        this.dropdownHolder.style.display = "inherit";
        this.tree.renderContent();
        calculateOverlayPlacement(this.dropdownHolder, this.selectContainer);
        this.arrowElement.classList.remove(constants.classNames.SimpleTreeChevronDown);
        this.arrowElement.classList.add(constants.classNames.SimpleTreeChevronUp);
    }

    private closeDropdown(): void {
        this.dropdownHolder.style.display = "none";
        this.dropdownHolder.style.top = ``;
        this.dropdownHolder.style.left = ``;
        this.dropdownHolder.style.width = ``;
        this.dropdownHolder.style.height = ``;
        this.arrowElement.classList.remove(constants.classNames.SimpleTreeChevronUp);
        this.arrowElement.classList.add(constants.classNames.SimpleTreeChevronDown);
    }
}
