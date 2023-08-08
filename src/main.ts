import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { createPinia } from "pinia";
import { IonicVue } from "@ionic/vue";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const pinia = createPinia();

// Wait for connection with firebase to run the app, this prevents refresh bugs
let app: any;

onAuthStateChanged(auth, () => {
  // Assign to app so it will only run once and not on every state change
  if (!app) {
    app = createApp(App).use(IonicVue).use(router).use(pinia);

    router.isReady().then(() => {
      app.mount("#app");
    });
  }
});
