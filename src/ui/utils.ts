import constants from "./ui-constants";

function createInternalContainer(element: HTMLElement, type: string, ...cssClasses: string[]): HTMLElement {
    const container: HTMLElement = document.createElement(type);
    container.classList.add(...cssClasses.filter((s) => s));
    element.appendChild(container);
    return container;
}

export function createContainer(element: HTMLElement, ...cssClasses: string[]): HTMLElement {
    return createInternalContainer(element, "div", ...cssClasses);
}

export function createUnorderedList(element: HTMLElement, ...cssClasses: string[]): HTMLElement {
    return createInternalContainer(element, "ul", ...cssClasses);
}

export function createListItem(element: HTMLElement, ...cssClasses: string[]): HTMLElement {
    return createInternalContainer(element, "li", ...cssClasses);
}

export function createDropdownContainer(): HTMLElement {
    const className = constants.classNames.SimpleTreeDropdownHolder;
    let container = document.body.querySelector(`.${className}`) as HTMLElement;

    if (!container) {
        container = createContainer(document.body, className);
        container.style.display = "none";
    }

    return container;
}

export function escape(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

export function escapeRegex(s: string): string {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
