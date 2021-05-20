import { CommonTreeLogic } from "./common-tree-logic";
import { TreeModeNameMap } from "../types/instance";
import { BaseOptions } from "../types/options";
import { calculateOverlay } from "./overlay-placement";
import constants from "./ui-constants";
import { Subscription } from "types/subscription";

export abstract class CommonDropdownTreeLogic<K extends keyof TreeModeNameMap> extends CommonTreeLogic<K> {
    protected dropdownOpen = false;
    private filterChangedSubscription!: Subscription | null;

    protected dropdownHolder!: HTMLElement;
    protected selectContainer!: HTMLElement;
    protected arrowElement!: HTMLElement;
    protected clearElement!: HTMLElement | null;

    private preventScrollListener!: null | ((e: WheelEvent) => void);
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
            this.calculateDropdownPosition()
        );

        if (this.options.css.dropdownHolder) {
            this.dropdownHolder.classList.add(this.options.css.dropdownHolder);
        }

        // Avoid interference of main page
        this.dropdownHolder.style.top = "-9999px";
        this.dropdownHolder.style.left = "-9999px";
        this.dropdownHolder.style.display = "inherit";

        this.calculateDropdownPosition();
        this.arrowElement.classList.remove(constants.classNames.SimpleTreeChevronDown);
        this.arrowElement.classList.add(constants.classNames.SimpleTreeChevronUp);
        this.dropdownOpen = true;
        window.addEventListener("mouseup", this.boundClick);

        if (this.options.scrollContainer) {
            this.preventScrollListener = (e) => {
                const root = this.dropdownHolder.querySelector(".simple-tree-node-container-root");
                if (!root?.contains(e.target as Element)) {
                    e.preventDefault();
                }
            };
            this.options.scrollContainer.addEventListener("wheel", this.preventScrollListener, { passive: false });
        }
    }

    protected closeDropdown(): void {
        if (!this.dropdownOpen) {
            return;
        }

        if (this.filterChangedSubscription) {
            this.filterChangedSubscription.dispose();
            this.filterChangedSubscription = null;
        }

        if (this.options.css.dropdownHolder) {
            this.dropdownHolder.classList.remove(this.options.css.dropdownHolder);
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

        if (this.options.scrollContainer && this.preventScrollListener) {
            this.options.scrollContainer.removeEventListener("wheel", this.preventScrollListener);
            this.preventScrollListener = null;
        }
    }

    private calculateDropdownPosition(): void {
        let height = 0;

        if (this.options.searchBar) {
            height += this.dropdownHolder.children[0].clientHeight;
            height += this.dropdownHolder.children[1].scrollHeight;
        } else {
            height += this.dropdownHolder.children[0].scrollHeight;
        }

        calculateOverlay(this.dropdownHolder, this.selectContainer.parentElement as HTMLElement, height);
    }

    protected updateClearButton(emptyValue: TreeModeNameMap[K]): void {
        const selectedCondition = Array.isArray(this.selected) ? this.selected.length > 0 : this.selected;

        if (this.options.clearButton && selectedCondition && !this.clearElement) {
            this.clearElement = document.createElement("i");
            this.clearElement.classList.add(constants.classNames.SimpleTreeCross);
            this.clearElement.onclick = (e: MouseEvent) => {
                if (!this.readOnly) {
                    this.setSelected(emptyValue);
                    this.eventManager.publish(constants.events.SelectionChanged, emptyValue);
                }

                e.stopPropagation();
            };

            this.selectContainer.appendChild(this.clearElement);
            this.selectContainer.classList.add(constants.classNames.SimpleTreeClearable);
        } else if (!selectedCondition && this.clearElement) {
            this.clearElement.remove();
            this.clearElement = null;
        }
    }
}
