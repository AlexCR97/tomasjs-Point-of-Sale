import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/global.css";
import { ComponentLibraryModule } from "./modules";

const app = createApp(App);

app.use(createPinia());
app.use(router);

ComponentLibraryModule(app);

app.mount("#app");
