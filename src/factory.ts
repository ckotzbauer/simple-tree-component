import { Instance } from "./types/instance";
import { Options, defaults } from "./types/options";
import { SingleSelectDropdown } from "./ui/single-select-dropdown";
import { MultiSelectDropdown } from "./ui/multi-select-dropdown";
import { TreeView } from "./ui/tree-view";

export function createSimpleTree(element: HTMLElement, instanceConfig: Options): Instance {
    const config = {
        ...defaults,
        ...instanceConfig,
    };

    if (config.mode === "singleSelectDropdown") {
        return new SingleSelectDropdown(element, config);
    } else if (config.mode === "multiSelectDropdown") {
        return new MultiSelectDropdown(element, config);
    } else {
        return new TreeView(element, config);
    }
}
