import { Options, BaseOptions } from "./options";

export interface Instance {
    destroy(): void;
}

export interface SimpleTreeFn {
    (selector: Node, config?: Options): Instance;
    (selector: ArrayLike<Node>, config?: Options): Instance[];
    (selector: string, config?: Options): Instance | Instance[];
    defaultConfig: Partial<BaseOptions>;
}
