import { createApp } from "vue";

import App from "./App.vue";

import "./assets/global.css";
import { RouterPlugin } from "./router";
import { ComponentLibraryPlugin, PiniaPlugin } from "./plugins";

const app = createApp(App);

app.use(RouterPlugin).use(ComponentLibraryPlugin).use(PiniaPlugin);

app.mount("#app");
