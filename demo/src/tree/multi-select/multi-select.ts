import simpleTree, { TreeNode, SimpleTree } from "simple-tree-component";
import { autoinject } from "aurelia-framework";

@autoinject()
export class MultiSelect {
  private tree: SimpleTree;

  constructor(private element: Element) {}

  public attached(): void {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodes: TreeNode[] = require("./data.json");

    this.tree = simpleTree(this.element.querySelector("#multi-select"), "multiSelectDropdown", {
      searchBar: true,
      nodes,
    });
  }
}
