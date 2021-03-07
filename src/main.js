import Vue from "vue";
// import lodash from "./plugins/lodash";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  // lodash,
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
