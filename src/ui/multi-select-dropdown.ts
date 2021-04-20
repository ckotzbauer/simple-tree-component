import { BaseOptions } from "../types/options";
import { BaseTree } from "./base-tree";
import { TreeNode } from "../types/tree-node";
import { createContainer, createDropdownContainer, createUnorderedList, createListItem } from "./utils";
import constants from "./ui-constants";
import { CommonDropdownTreeLogic } from "./common-dropdown-tree-logic";

export class MultiSelectDropdown extends CommonDropdownTreeLogic<"multiSelectDropdown"> {
    private pillboxContainer!: HTMLElement;

    constructor(element: HTMLElement, options: BaseOptions) {
        super(element, options);
        this.rootContainer = createContainer(element, constants.classNames.SimpleTree);
        this.selected = this.dataService.getSelected();

        this.dropdownHolder = createDropdownContainer(options.css.dropdownHolder);
        this.tree = new BaseTree(this.dropdownHolder, options, this.dataService, this.eventManager, this.readOnly);
        this.subscribe(constants.events.NodeSelected, (n: TreeNode) => this.nodeSelected(n));
        this.renderSelectField(this.rootContainer);
    }

    /////////////////////////////// PUBLIC API ///////////////////////////////

    public setSelected(value: TreeNode[]): void {
        this.dataService.setSelected(...(value || []));
        super.setSelected(this.dataService.getSelected());
        this.renderPillboxes();
    }

    public setReadOnly(readOnly: boolean): void {
        super.setReadOnly(readOnly);

        if (readOnly && this.dropdownOpen) {
            this.closeDropdown();
        }
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

        this.dataService.setSelected(...this.selected);
        this.selected = this.dataService.getSelected();
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

            const cross: HTMLElement = createContainer(listItem, constants.classNames.SimpleTreePillboxCross);
            cross.addEventListener("click", (e: MouseEvent) => {
                if (!this.readOnly) {
                    this.nodeSelected(item);
                }

                e.stopPropagation();
            });
        });

        if (this.options.clearButton && this.selected.length > 0 && !this.clearElement) {
            this.clearElement = document.createElement("i");
            this.clearElement.classList.add(constants.classNames.SimpleTreeCross);
            this.clearElement.onclick = (e: MouseEvent) => {
                if (!this.readOnly) {
                    this.setSelected([]);
                    this.eventManager.publish(constants.events.SelectionChanged, []);
                }

                e.stopPropagation();
            };

            this.selectContainer.appendChild(this.clearElement);
            this.selectContainer.classList.add(constants.classNames.SimpleTreeClearable);
        } else if (this.selected.length === 0 && this.clearElement) {
            this.clearElement.remove();
            this.clearElement = null;
        }
    }
}
