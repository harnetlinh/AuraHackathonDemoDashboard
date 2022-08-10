import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import GAuth from 'vue3-google-oauth2'

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(GAuth, {
    clientId: '30699706786-ifo2nfhijddjo91ehnemflcfocpov3gg.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'consent', 
    fetch_basic_profile: false
});
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
