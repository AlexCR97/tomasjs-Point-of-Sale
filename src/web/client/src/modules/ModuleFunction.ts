import type { App } from "vue";

export interface ModuleFunction {
  (app: App<Element>): void | Promise<void>;
}
