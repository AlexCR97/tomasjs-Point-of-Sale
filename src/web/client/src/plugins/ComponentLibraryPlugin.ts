import "primevue/resources/themes/viva-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "@/assets/primevue.css";
import PrimeVue from "primevue/config";
import type { Plugin } from "vue";

export const ComponentLibraryPlugin: Plugin = (app) => {
  app.use(PrimeVue, {
    ripple: true, // Enable/disable ripple effect
  });
};
