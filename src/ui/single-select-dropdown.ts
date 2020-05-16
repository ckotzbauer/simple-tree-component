import { DataService } from "../data/data-service";
import { InternalOptions } from "../types/options";
import { Instance } from "../types/instance";
import { BaseTree } from "./base-tree";
import { createContainer, createDropdownContainer } from "./utils";
import { calculateOverlayPlacement } from "./overlay-placement";
import { TreeNode } from "types/tree-node";
import constants from "./ui-constants";

export class SingleSelectDropdown implements Instance<"singleSelectDropdown"> {
    private dataService: DataService;
    private tree: BaseTree;
    private dropdownOpen = false;
    public selected!: TreeNode;

    private dropdownHolder!: HTMLElement;
    private selectContainer!: HTMLElement;
    private selectedLabel!: HTMLElement;
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    private nodeSelected(_node: TreeNode): void {}

    private renderSelectField(container: HTMLElement): void {
        this.selectContainer = createContainer(container, constants.classNames.SimpleTreeSingleSelectBox);
        this.selectContainer.onclick = () => this.toggleDropdown();

        this.selectedLabel = document.createElement("span");
        this.selectedLabel.classList.add(constants.classNames.SimpleTreeSelectedLabel);
        this.selectedLabel.innerText = this.selected ? this.options.templateSelectedText(this.selected) : this.options.watermark;
        this.selectContainer.appendChild(this.selectedLabel);

        if (!this.selected) {
            this.selectedLabel.classList.add(constants.classNames.SimpleTreeSelectedLabelWatermark);
        }

        this.arrowElement = document.createElement("i");
        this.arrowElement.classList.add(constants.classNames.SimpleTreeChevronDown);
        this.selectContainer.appendChild(this.arrowElement);
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
        calculateOverlayPlacement(this.dropdownHolder, this.selectContainer);
    }

    private closeDropdown(): void {
        this.dropdownHolder.style.display = "none";
        this.dropdownHolder.style.top = ``;
        this.dropdownHolder.style.left = ``;
        this.dropdownHolder.style.width = ``;
        this.dropdownHolder.style.height = ``;
    }
}
