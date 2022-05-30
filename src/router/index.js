import Vue from 'vue'
import VueRouter from 'vue-router'
import multi from '../views/multiElement.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/multi',
    name: 'multi',
    component: multi
  }
]

const router = new VueRouter({
  routes
})

export default router
