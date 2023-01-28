import "primevue/resources/themes/tailwind-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "@/assets/primevue.css";
import PrimeVue from "primevue/config";
import type { ModuleFunction } from "./ModuleFunction";

export const ComponentLibraryModule: ModuleFunction = (app) => {
  app.use(PrimeVue, {
    ripple: true, // Enable/disable ripple effect
  });
};
