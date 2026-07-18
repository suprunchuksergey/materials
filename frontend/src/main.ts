import { createApp } from "vue";
import { RouterView } from "vue-router";
import { createPinia } from "pinia";
import router from "@/router";
import "@/style.css";

createApp(RouterView).use(createPinia()).use(router).mount("#app");
