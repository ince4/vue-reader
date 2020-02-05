import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mint from 'mint-ui'
import axios from 'axios'
import '../public/css/init.css'
import 'mint-ui/lib/style.css'
import './assets/iconfonts/iconfont.css'

Vue.use(Mint)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
