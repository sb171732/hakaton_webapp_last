import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import {store} from './store'
Vue.config.productionTip = false

new Vue({
  router,
  created(){
        store.dispatch('getLoginStatus')
  },
  render: h => h(App)
}).$mount('#app')

