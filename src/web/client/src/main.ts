import { createApp } from "vue";

import App from "./App.vue";

import "./assets/global.css";
import { RouterPlugin } from "./router";
import { ComponentLibraryPlugin, PiniaPlugin } from "./plugins";

console.log("Creating app...");

const app = createApp(App);

console.log("Installing modules...");
app.use(RouterPlugin).use(ComponentLibraryPlugin).use(PiniaPlugin);

app.mount("#app");

console.log("App mounted!");
