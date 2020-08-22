import { BaseOptions } from "../types/options";
import { BaseTree } from "./base-tree";
import { createContainer, createDropdownContainer } from "./utils";
import { TreeNode } from "../types/tree-node";
import constants from "./ui-constants";
import { CommonDropdownTreeLogic } from "./common-dropdown-tree-logic";

export class SingleSelectDropdown extends CommonDropdownTreeLogic<"singleSelectDropdown"> {
    private emphasisCssClass!: string | null;

    private selectedLabel!: HTMLElement;
    private emphasizeElement!: HTMLElement | null;

    constructor(element: HTMLElement, options: BaseOptions) {
        super(element, options);
        this.rootContainer = createContainer(element, constants.classNames.SimpleTree);
        this.selected = this.dataService.getSelected()[0] || null;

        this.dropdownHolder = createDropdownContainer(options.css.dropdownHolder);
        this.tree = new BaseTree(this.dropdownHolder, options, this.dataService, this.eventManager, this.readOnly);
        this.subscribe(constants.events.NodeSelected, (n: TreeNode) => this.nodeSelected(n));
        this.renderSelectField(this.rootContainer);
    }

    /////////////////////////////// PUBLIC API ///////////////////////////////

    public setSelected(value: TreeNode): void {
        super.setSelected(value);
        this.dataService.setSelected(value);
        this.updateUiOnSelection();
        this.tree.setHighlighting(value);
    }

    public setReadOnly(readOnly: boolean): void {
        super.setReadOnly(readOnly);

        if (readOnly && this.dropdownOpen) {
            this.closeDropdown();
        }
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
        this.dataService.setSelected(node);
        this.tree.setHighlighting(node);
        this.updateUiOnSelection();
        this.closeDropdown();
        this.eventManager.publish(constants.events.SelectionChanged, this.selected);
    }

    private renderSelectField(container: HTMLElement): void {
        this.selectContainer = createContainer(container, constants.classNames.SimpleTreeSingleSelectBox);
        this.selectContainer.onclick = () => !this.readOnly && this.toggleDropdown();

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
}
