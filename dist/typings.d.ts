import { SimpleTreeFn } from "./types/instance";
import { Instance } from "./types/instance";

declare const simpleTree: SimpleTreeFn;

export default simpleTree;
export type SimpleTree = Instance<"singleSelectDropdown" | "multiSelectDropdown" | "view">;
export { Options, BaseOptions, TreeConfiguration } from "./types/options";
export { TreeNode } from "./types/tree-node";
export * from "./types/globals";
export * from "./types/rects";
export * from "./types/subscription";
export * from "./ui/overlay-placement";
