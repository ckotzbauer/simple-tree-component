import { Instance, TreeModeNameMap } from "./types/instance";
import { Options, defaults, InternalOptions } from "./types/options";
import { SingleSelectDropdown } from "./ui/single-select-dropdown";
import { MultiSelectDropdown } from "./ui/multi-select-dropdown";
import { TreeView } from "./ui/tree-view";

export function createSimpleTree<K extends keyof TreeModeNameMap>(
    element: HTMLElement,
    mode: K,
    instanceConfig: Options<K>
): Instance<K> {
    const config: InternalOptions<K> = {
        ...defaults,
        ...instanceConfig,
    };

    if (mode === "singleSelectDropdown") {
        return new SingleSelectDropdown(element, config as InternalOptions<"singleSelectDropdown">) as any;
    } else if (mode === "multiSelectDropdown") {
        return new MultiSelectDropdown(element, config as InternalOptions<"multiSelectDropdown">) as any;
    } else {
        config.highlightSelected = true;
        return new TreeView(element, config as InternalOptions<"view">) as any;
    }
}
