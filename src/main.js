import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { startFB } from './firebase/firebase'
import { getApps, getApp } from "firebase/app"
import store from './store'

Vue.config.productionTip = false
getApps().length === 0 ? startFB() : getApp()

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')