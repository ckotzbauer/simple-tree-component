import { TreeConfiguration } from "../types/options";
import { DataService } from "data/data-service";

export class BaseTree {
    constructor(
        public element: HTMLElement,
        public config: TreeConfiguration,
        public dataService: DataService
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public destroy(): void {}
}
