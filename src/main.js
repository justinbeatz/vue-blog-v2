import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import Notifications from 'vue-notification';
import VueQuill from 'vue-quill';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Notifications);
Vue.use(VueQuill);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
