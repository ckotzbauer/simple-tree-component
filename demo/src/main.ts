import { Aurelia } from "aurelia-framework";
import * as environment from "../config/environment.json";
import { PLATFORM } from "aurelia-pal";

export function configure(aurelia: Aurelia): void {
  aurelia.use.standardConfiguration();

  aurelia.use.developmentLogging(environment.debug ? "debug" : "warn");

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName("app")));
}
