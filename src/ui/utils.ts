export function createContainer(element: HTMLElement): HTMLElement {
    const container: HTMLElement = document.createElement("div");
    container.classList.add("simple-tree");
    element.appendChild(container);
    return container;
}
