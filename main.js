// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

import apiConfig from '../config/api.config'
import Axios from 'axios'
import VueAxios from 'vue-axios'

// Vue.prototype.HOST='/api'
Axios.defaults.headers.post["Content-type"]="application/json";
Axios.defaults.baseURL=apiConfig.baseUrl;
// Axios.defaults.baseURL='/api';
Axios.defaults.withCredentials=true
Vue.prototype.axios=Axios

import qs from 'Qs'
Vue.prototype.qs=qs

//ui组件
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView,VueAxios,Axios)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  template: '<App/>'
})
