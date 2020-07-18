import { CommonTreeLogic } from "./common-tree-logic";
import { TreeModeNameMap } from "../types/instance";
import { BaseOptions } from "../types/options";
import { calculateOverlayPlacement } from "./overlay-placement";
import constants from "./ui-constants";

export abstract class CommonDropdownTreeLogic<K extends keyof TreeModeNameMap> extends CommonTreeLogic<K> {
    protected dropdownOpen = false;

    protected dropdownHolder!: HTMLElement;
    protected selectContainer!: HTMLElement;
    protected arrowElement!: HTMLElement;

    constructor(element: Element, options: BaseOptions) {
        super(element, options);
    }

    protected toggleDropdown(): void {
        if (this.dropdownOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    protected openDropdown(): void {
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

    protected closeDropdown(): void {
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
