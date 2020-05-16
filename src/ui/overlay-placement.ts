import { Rect } from "../types/rects";

export function calculate(elementRect: Rect, availableHeight: number, overlayHeight: number, maxOverlayHeight = 200): Rect {
    let top = elementRect.top + elementRect.height;
    let height = overlayHeight > maxOverlayHeight ? maxOverlayHeight : overlayHeight;

    if (top + height > availableHeight) {
        // show above of the corresponding element
        top = elementRect.top - height;
    }

    if (top < 0) {
        // show below of the corresponding element and reduce height
        top = elementRect.top + elementRect.height;
        height = availableHeight - top;
    }

    return {
        top,
        left: elementRect.left,
        width: elementRect.width,
        height,
    };
}

export function calculateOverlayPlacement(overlay: HTMLElement, element: HTMLElement, maxHeight = 200): void {
    const rect = calculate(
        {
            top: element.offsetTop,
            height: element.offsetHeight,
            left: element.offsetLeft,
            width: element.offsetWidth,
        },
        window.innerHeight,
        overlay.clientHeight,
        maxHeight
    );

    overlay.style.top = `${rect.top}px`;
    overlay.style.left = `${rect.left}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
}
