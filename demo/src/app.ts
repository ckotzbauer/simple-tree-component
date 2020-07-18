import "../node_modules/simple-tree-component/dist/scss/index.scss";
import { RouterConfiguration, Router } from "aurelia-router";
import { PLATFORM } from "aurelia-pal";

export class App {
  private router: Router;

  public configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = "Simple Tree";
    config.map([
      {
        route: ["", "single-select"],
        name: "single-select",
        moduleId: PLATFORM.moduleName("tree/single-select/single-select"),
        title: "Single-Select",
        nav: true,
      },
      {
        route: "multi-select",
        name: "multi-select",
        moduleId: PLATFORM.moduleName("tree/multi-select/multi-select"),
        title: "Multi-Select",
        nav: true,
      },
      {
        route: "tree-view",
        name: "tree-view",
        moduleId: PLATFORM.moduleName("tree/tree-view/tree-view"),
        title: "Tree-View",
        nav: true,
      },
      {
        route: "tree-view-checkbox",
        name: "tree-view-checkbox",
        moduleId: PLATFORM.moduleName("tree/tree-view-checkbox/tree-view-checkbox"),
        title: "Tree-View (with Checkboxes)",
        nav: true,
      },
    ]);
  }
}
