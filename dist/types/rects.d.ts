export interface Rect {
    top: number;
    left: number;
    width: number;
    height: number;
}
export declare function calculate(
    elementRect: Rect,
    availableHeight: number,
    overlayHeight: number,
    borderWith: number,
    maxOverlayHeight?: number
): Rect;
export declare function calculateOverlayPlacement(overlay: HTMLElement, element: HTMLElement, maxHeight?: number): void;
