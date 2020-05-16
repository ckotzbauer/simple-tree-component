import { Instance, TreeModeNameMap } from "./types/instance";
import { Options, defaults } from "./types/options";
import { SingleSelectDropdown } from "./ui/single-select-dropdown";
import { MultiSelectDropdown } from "./ui/multi-select-dropdown";
import { TreeView } from "./ui/tree-view";

export function createSimpleTree<K extends keyof TreeModeNameMap>(
    element: HTMLElement,
    mode: K,
    instanceConfig: Options
): Instance<K> {
    const config = {
        ...defaults,
        ...instanceConfig,
    };

    if (mode === "singleSelectDropdown") {
        return new SingleSelectDropdown(element, config) as any;
    } else if (mode === "multiSelectDropdown") {
        return new MultiSelectDropdown(element, config) as any;
    } else {
        config.highlightSelected = true;
        return new TreeView(element, config) as any;
    }
}
