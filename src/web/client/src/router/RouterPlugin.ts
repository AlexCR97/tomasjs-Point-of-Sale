import type { Plugin } from "vue";
import { Router } from "./Router";

export const RouterPlugin: Plugin = (app) => {
  app.use(Router);
};
