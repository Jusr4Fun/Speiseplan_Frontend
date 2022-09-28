import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { Ripple } from "vuetify/lib/directives";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  vuetify,
  directives: {
    Ripple,
  },
  render: (h) => h(App),
}).$mount("#app");
