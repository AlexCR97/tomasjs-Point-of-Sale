import type { Plugin } from "vue";
import { Router } from "./router";

export const RouterPlugin: Plugin = (app) => {
  app.use(Router);
};
