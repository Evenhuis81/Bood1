require("./bootstrap");

window.Vue = require("vue");
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import Vuex from "vuex";
import router from "./router.js";
import store from "./store.js";
Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const app = new Vue({
    BootstrapVue,
    IconsPlugin,
    Vuex,
    router,
    store,
    el: "#app"
});
