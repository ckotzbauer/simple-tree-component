import { Options } from "./options";
import { Instance } from "./instance";

declare global {
    interface HTMLElement {
        simpleTree: (config?: Options) => Instance;
        _simpleTree?: Instance;
    }

    interface NodeList {
        simpleTree: (config?: Options) => Instance | Instance[];
    }

    interface HTMLCollection {
        simpleTree: (config?: Options) => Instance | Instance[];
    }
}
