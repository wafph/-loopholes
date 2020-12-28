window.Promise = window.Promise || Promise;
import Vue from 'vue';
import App from './App';
import store from './store'
import http from './util/axios';
import axios from 'axios';
import './permission' // 权限
import router from './router/router';
import ELEMENT from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as filters from './filters' // 全局filter
import './styles/common.scss';
import VueSlideUpDown from 'vue-slide-up-down'
Vue.prototype.$http = http;
axios.defaults.withCredentials = true;
axios.defaults.crossDomain=true;
Vue.component('vue-slide-up-down', VueSlideUpDown)
Vue.use(ELEMENT);
Vue.use(require('vue-wechat-title'))
// Vue.use(VueAxios, axios)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false;
Vue.config.devtools = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
