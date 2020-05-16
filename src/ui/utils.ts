import constants from "./ui-constants";

export function createContainer(element: HTMLElement, ...cssClasses: string[]): HTMLElement {
    const container: HTMLElement = document.createElement("div");
    container.classList.add(...cssClasses.filter((s) => s));
    element.appendChild(container);
    return container;
}

export function createDropdownContainer(customCssClass: string): HTMLElement {
    const className = constants.classNames.SimpleTreeDropdownHolder;
    let container = document.body.querySelector(`.${className}`) as HTMLElement;

    if (!container) {
        container = createContainer(document.body, className, customCssClass);
        container.style.display = "none";
    }

    return container;
}
