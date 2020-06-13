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
    private selected!: TreeNode;
    private emphasisCssClass!: string | null;

    private dropdownHolder!: HTMLElement;
    private selectContainer!: HTMLElement;
    private selectedLabel!: HTMLElement;
    private arrowElement!: HTMLElement;
    private emphasizeElement!: HTMLElement | null;

    constructor(private element: HTMLElement, public options: InternalOptions) {
        const container: HTMLElement = createContainer(element, constants.classNames.SimpleTree);

        this.dataService = new DataService(options.nodes);

        this.dropdownHolder = createDropdownContainer(options.css.dropdownHolder);
        this.tree = new BaseTree(this.dropdownHolder, options, this.dataService, this.nodeSelected.bind(this));
        this.renderSelectField(container);
    }

    /////////////////////////////// PUBLIC API ///////////////////////////////

    public destroy(): void {
        this.tree.destroy();
        Array.from(this.element.children).forEach((e: Element) => this.element.removeChild(e));

        this.dataService.clear();
    }

    public setSelected(value: TreeNode): void {
        this.selected = value;
        this.updateUiOnSelection();
        this.tree.setHighlighting(value);
    }

    public getSelected(): TreeNode {
        return this.selected;
    }

    public showEmphasizeIcon(cssClass: string): void {
        this.emphasisCssClass = cssClass;

        if (this.selected && this.emphasisCssClass) {
            this.selectContainer.classList.add(constants.classNames.SimpleTreeEmphasized);
            this.emphasizeElement = document.createElement("i");
            this.emphasizeElement.classList.add(constants.classNames.SimpleTreeEmphasize, cssClass);
            this.selectContainer.appendChild(this.emphasizeElement);
        }
    }

    public hideEmphasizeIcon(): void {
        this.emphasisCssClass = null;

        if (this.emphasizeElement) {
            this.selectContainer.classList.remove(constants.classNames.SimpleTreeEmphasized);
            this.selectContainer.removeChild(this.emphasizeElement);
            this.emphasizeElement = null;
        }
    }

    //////////////////////////////////////////////////////////////////////////

    private nodeSelected(node: TreeNode): void {
        this.selected = node;
        this.updateUiOnSelection();
        this.closeDropdown();
    }

    private renderSelectField(container: HTMLElement): void {
        this.selectContainer = createContainer(container, constants.classNames.SimpleTreeSingleSelectBox);
        this.selectContainer.onclick = () => this.toggleDropdown();

        this.selectedLabel = document.createElement("span");
        this.selectedLabel.classList.add(constants.classNames.SimpleTreeSelectedLabel);
        this.selectContainer.appendChild(this.selectedLabel);
        this.updateUiOnSelection();

        this.arrowElement = document.createElement("i");
        this.arrowElement.classList.add(constants.classNames.SimpleTreeChevronDown);
        this.selectContainer.appendChild(this.arrowElement);
    }

    private updateUiOnSelection(): void {
        this.selectedLabel.innerText = this.selected ? this.options.templateSelectedText(this.selected) : this.options.watermark;
        this.selectedLabel.classList.toggle(constants.classNames.SimpleTreeSelectedLabelWatermark, !this.selected);

        if (this.emphasisCssClass && this.selected) {
            this.showEmphasizeIcon(this.emphasisCssClass);
        } else if (!this.selected) {
            const css = this.emphasisCssClass;
            this.hideEmphasizeIcon();
            this.emphasisCssClass = css; // restore the class here
        }
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
