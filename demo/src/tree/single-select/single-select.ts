import simpleTree, { InitTreeNode, SimpleTree } from "simple-tree-component";
import { autoinject } from "aurelia-framework";

@autoinject()
export class SingleSelect {
  private tree: SimpleTree;

  constructor(private element: Element) {}

  public attached(): void {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodes: InitTreeNode[] = require("./data.json");

    this.tree = simpleTree(this.element.querySelector("#single-select"), "singleSelectDropdown", {
      searchBar: true,
      nodes,
    });
  }
}
