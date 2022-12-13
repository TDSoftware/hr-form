import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);

Vue.config.productionTip = false;

//  Toastr
import Toastr from "./plugins/Toastr/Toastr";
Vue.use(Toastr);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
