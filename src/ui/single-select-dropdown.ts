import { DataService } from "../data/data-service";
import { BaseOptions } from "../types/options";
import { Instance } from "../types/instance";
import { BaseTree } from "./base-tree";
import { createContainer, createDropdownContainer } from "./utils";
import classNames from "./class-names";

export class SingleSelectDropdown implements Instance {
    private dataService: DataService;
    private tree: BaseTree;
    private dropdownOpen = false;

    private dropdownHolder!: HTMLElement;
    private selectContainer!: HTMLElement;
    private selectedLabel!: HTMLElement;
    private arrowElement!: HTMLElement;

    constructor(private element: HTMLElement, public options: BaseOptions) {
        const container: HTMLElement = createContainer(element, classNames.SimpleTree);

        this.dataService = new DataService(options.nodes);

        this.dropdownHolder = createDropdownContainer(options.css.dropdownHolder);
        this.tree = new BaseTree(this.dropdownHolder, options, this.dataService);
        this.renderSelectField(container);
    }

    public destroy(): void {
        this.tree.destroy();
        Array.from(this.element.children).forEach((e: Element) => this.element.removeChild(e));

        this.dataService.clear();
    }

    private renderSelectField(container: HTMLElement): void {
        this.selectContainer = createContainer(container, classNames.SimpleTreeSingleSelectBox);
        this.selectContainer.onclick = () => this.toggleDropdown();

        this.selectedLabel = document.createElement("span");
        this.selectedLabel.classList.add(classNames.SimpleTreeSelectedLabel);
        this.selectedLabel.innerText = "hallo";
        this.selectContainer.appendChild(this.selectedLabel);

        this.arrowElement = document.createElement("i");
        this.arrowElement.classList.add(classNames.SimpleTreeChevronDown);
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
        this.dropdownHolder.style.top = `${this.selectContainer.offsetTop + this.selectContainer.offsetHeight}px`;
        this.dropdownHolder.style.left = `${this.selectContainer.offsetLeft}px`;
        this.dropdownHolder.style.width = `${this.selectContainer.offsetWidth}px`;
    }

    private closeDropdown(): void {
        this.dropdownHolder.style.display = "none";
    }
}
