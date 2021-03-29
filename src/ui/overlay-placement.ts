import { Rect } from "../types/rects";

export function calculate(
    elementRect: Rect,
    availableHeight: number,
    overlayHeight: number,
    borderWith = 0,
    maxOverlayHeight = 300
): Rect {
    let top = elementRect.top + elementRect.height + borderWith;
    let height = overlayHeight > maxOverlayHeight ? maxOverlayHeight : overlayHeight;
    const tolerance = 10;
    const topRelative = top - window.scrollY;

    if (topRelative + height + tolerance > availableHeight) {
        // show above of the corresponding element
        top = elementRect.top - height - borderWith;
    }

    if (top < 0) {
        // show below of the corresponding element and reduce height
        top = elementRect.top + elementRect.height + borderWith;
        height = availableHeight - top - tolerance;
    }

    return {
        top,
        left: elementRect.left - borderWith,
        width: elementRect.width - borderWith,
        height,
    };
}

export function calculateOverlayPlacement(overlay: HTMLElement, element: HTMLElement, maxHeight = 300): void {
    const { top, left } = element.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const rect = calculate(
        {
            top: top + scrollY,
            height: element.offsetHeight,
            left: left + scrollX,
            width: element.offsetWidth,
        },
        window.innerHeight,
        overlay.clientHeight,
        parseInt(getComputedStyle(overlay).borderLeftWidth.replace("px", ""), 10),
        maxHeight
    );

    overlay.style.top = `${rect.top}px`;
    overlay.style.left = `${rect.left}px`;
    overlay.style.width = `${rect.width}px`;
}
