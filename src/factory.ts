import { Instance } from "./types/instance";
import { Options } from "./types/options";

export function createSimpleTree(
    _element: HTMLElement,
    _instanceConfig?: Options
): Instance {
    return { destroy: () => null };
}
