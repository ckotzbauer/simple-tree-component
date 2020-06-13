import { SimpleTreeFn, TreeModeNameMap } from "./types/instance";
import { Instance as _Instance } from "./types/instance";
import { Options as _Options } from "./types/options";

declare const simpleTree: SimpleTreeFn;

declare namespace simpleTree {
    export type Instance = _Instance<"singleSelectDropdown" | "multiSelectDropdown" | "view">;

    export namespace Options {
        export type Options<K extends keyof TreeModeNameMap> = _Options<K>;
    }
}

export default simpleTree;
