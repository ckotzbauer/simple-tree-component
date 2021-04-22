/**
 * A general rectangle object which is used from the `calculate` function.
 */
export interface Rect {
    /**
     * Difference from the base-point in y-direction.
     */
    top: number;
    /**
     * Difference from the base-point in x-direction.
     */
    left: number;
    /**
     * Width of the rectangle.
     */
    width: number;
    /**
     * Height of the rectangle.
     */
    height: number;
}
/**
 * Calculates a rectangle to display a overlay-flyout relative to the position of the given `elementRect`.
 * The following strategy is used (in order):
 *   1. The overlay can be placed with its `overlayHeight` below of the `elementRect` without exceeding the `availableHeight`.
 *   2. The overlay can be placed with its `overlayHeight` above of the `elementRect` with a top greater `0`.
 *   3. The overlay is placed below of the `elementRect` with a reduced height to fit into `availableHeight`.
 *
 * It is assumed, that the width of the overlay is the same as of the `elementRect`.
 *
 * @param elementRect The rectangle of the element this calculation belongs to.
 * (e.g. rectangle of the selectbox for which the position of the flyout should be calculated.)
 * @param availableHeight Full height of the surrounding container (e.g. window height)
 * @param overlayHeight The height of the overlay which should be positioned.
 * @param borderWith The border-width used. It is assumed, that all borders have the same width. Defaults to `0`
 * @param maxOverlayHeight The maximum height of the overlay. Defaults to `300`.
 * @returns The calculated rectangle of the overlay position.
 */
export declare function calculate(elementRect: Rect, availableHeight: number, overlayHeight: number, borderWith?: number, maxOverlayHeight?: number): Rect;
/**
 * Calculates the position of the `overlay` relative to the `element` and sets the values accordingly.
 * See the docs of the `calculate` function for more details.
 *
 * @param overlay The HTML element of the overlay, which should be placed correctly.
 * @param element The HTML element to which the `overlay` belongs.
 * @param maxHeight The maximum height of the overlay. Defaults to `300`.
 */
export declare function calculateOverlayPlacement(overlay: HTMLElement, element: HTMLElement, maxHeight?: number): void;
