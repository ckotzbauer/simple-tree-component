import { SimpleTreeFn } from "./types/instance";
import { Instance as _Instance } from "./types/instance";
import {
    Options as _Options,
} from "./types/options";

declare const simpleTree: SimpleTreeFn;

declare namespace simpleTree {
    export type Instance = _Instance;

    export namespace Options {
        export type Options = _Options;
    }
}

export default simpleTree;
