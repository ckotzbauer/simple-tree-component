import { Options } from "./options";
import { Instance, TreeModeNameMap } from "./instance";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElement {
        simpleTree: <K extends keyof TreeModeNameMap>(mode: K, config?: Options) => Instance<K>;
        _simpleTree?: Instance<any>;
    }

    interface NodeList {
        simpleTree: <K extends keyof TreeModeNameMap>(mode: K, config?: Options) => Instance<K> | Instance<K>[];
    }

    interface HTMLCollection {
        simpleTree: <K extends keyof TreeModeNameMap>(mode: K, config?: Options) => Instance<K> | Instance<K>[];
    }
}
