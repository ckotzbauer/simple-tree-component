import { Rect } from "../types/rects";
export declare function calculate(elementRect: Rect, availableHeight: number, overlayHeight: number, maxOverlayHeight?: number): Rect;
export declare function calculateOverlayPlacement(overlay: HTMLElement, element: HTMLElement, maxHeight?: number): void;
