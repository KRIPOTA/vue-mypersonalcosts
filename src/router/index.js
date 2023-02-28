import Vue from 'vue'
import VueRouter from 'vue-router'
import Moneyform from '../components/Moneyform.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/moneyform/:category?/:value?',
    name: 'moneyform',
    component: Moneyform,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
