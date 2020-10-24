import { TreeInstance, TreeModeNameMap } from "./types/instance";
import { Options, defaults, BaseOptions } from "./types/options";
import { SingleSelectDropdown } from "./ui/single-select-dropdown";
import { MultiSelectDropdown } from "./ui/multi-select-dropdown";
import { TreeView } from "./ui/tree-view";

export function createSimpleTree<K extends keyof TreeModeNameMap>(
    element: HTMLElement,
    mode: K,
    instanceConfig: Options
): TreeInstance<K> {
    const config: BaseOptions = {
        ...defaults,
        ...instanceConfig,
    };

    if (mode === "singleSelectDropdown") {
        return new SingleSelectDropdown(element, config as BaseOptions) as any;
    } else if (mode === "multiSelectDropdown") {
        return new MultiSelectDropdown(element, config as BaseOptions) as any;
    } else {
        return new TreeView(element, config as BaseOptions) as any;
    }
}
