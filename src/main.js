import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ModalPlugin from './plugins/ModalPlugin'
import vuetify from './plugins/vuetify'
import "echarts";

Vue.config.productionTip = false

Vue.use(ModalPlugin)

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
