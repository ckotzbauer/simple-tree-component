import { CommonTreeLogic } from "./common-tree-logic";
import { TreeModeNameMap } from "../types/instance";
import { BaseOptions } from "../types/options";
import { calculateOverlayPlacement } from "./overlay-placement";
import constants from "./ui-constants";
import { Subscription } from "types/subscription";

export abstract class CommonDropdownTreeLogic<K extends keyof TreeModeNameMap> extends CommonTreeLogic<K> {
    protected dropdownOpen = false;
    private filterChangedSubscription!: Subscription | null;

    protected dropdownHolder!: HTMLElement;
    protected selectContainer!: HTMLElement;
    protected arrowElement!: HTMLElement;
    protected clearElement!: HTMLElement | null;

    private boundClick: (e: MouseEvent) => void;

    constructor(element: Element, options: BaseOptions) {
        super(element, options);
        this.eventManager.subscribe(constants.events.EscapePressed, () => this.closeDropdown());
        this.boundClick = this.onClick.bind(this);
    }

    protected toggleDropdown(): void {
        if (this.dropdownOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    private onClick(e: MouseEvent): void {
        const clickedElement = e.target as HTMLElement;

        if (!this.dropdownHolder.contains(clickedElement) && !this.selectContainer.contains(clickedElement)) {
            // clicked outside
            this.closeDropdown();
        }
    }

    protected openDropdown(): void {
        if (this.readOnly) {
            return;
        }

        this.tree.renderContent();
        this.tree.activateKeyListener();
        this.filterChangedSubscription = this.eventManager.subscribe(constants.events.FilterChanged, () =>
            calculateOverlayPlacement(this.dropdownHolder, this.selectContainer.parentElement as HTMLElement)
        );

        // Avoid interference of main page
        this.dropdownHolder.style.top = "-9999px";
        this.dropdownHolder.style.left = "-9999px";
        this.dropdownHolder.style.display = "inherit";

        calculateOverlayPlacement(this.dropdownHolder, this.selectContainer.parentElement as HTMLElement);
        this.arrowElement.classList.remove(constants.classNames.SimpleTreeChevronDown);
        this.arrowElement.classList.add(constants.classNames.SimpleTreeChevronUp);
        this.dropdownOpen = true;
        window.addEventListener("mouseup", this.boundClick);
    }

    protected closeDropdown(): void {
        if (!this.dropdownOpen) {
            return;
        }

        if (this.filterChangedSubscription) {
            this.filterChangedSubscription.dispose();
            this.filterChangedSubscription = null;
        }

        this.dropdownHolder.style.display = "none";
        this.dropdownHolder.style.top = ``;
        this.dropdownHolder.style.left = ``;
        this.dropdownHolder.style.width = ``;
        this.dropdownHolder.style.height = ``;
        this.arrowElement.classList.remove(constants.classNames.SimpleTreeChevronUp);
        this.arrowElement.classList.add(constants.classNames.SimpleTreeChevronDown);
        this.dropdownOpen = false;
        window.removeEventListener("mouseup", this.boundClick);
        this.tree.deactivateKeyListener();
    }
}
