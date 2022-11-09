import Vue from "vue";
import Vuex from "vuex";

import * as auth from "@/store/modules/Auth";
import * as user from "@/store/modules/User";
import * as data from "@/store/modules/Data";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  modules: {
    auth,
    user,
    data,
  },
});
