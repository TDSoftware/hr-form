import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

//  Toastr
import Toastr from "./plugins/Toastr/Toastr";
Vue.use(Toastr);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
