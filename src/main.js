import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import Notifications from 'vue-notification';
import VueQuill from 'vue-quill';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import VueToastr from 'vue-toastr';
import App from './App.vue';
import router from './router';
import store from './store';
import './config/axios';

Vue.config.productionTip = false;

Vue.use(Notifications);
Vue.use(VueQuill);
Vue.use(VueToastr, {
  /* OverWrite Plugin Options if you need */
});
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
