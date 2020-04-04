import { Instance } from "../types/instance";
import { BaseOptions } from "../types/options";

export abstract class BaseTree implements Instance {
    constructor(protected element: HTMLElement, public options: BaseOptions) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public destroy(): void {}
}
