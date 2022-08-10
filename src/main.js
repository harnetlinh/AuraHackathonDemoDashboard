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
    clientId: '472262699846-vhdb29g3b9hoei4rc6ou45heju9v8mth.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'consent', 
    fetch_basic_profile: false,
    plugin_name: 'Google',
});
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
