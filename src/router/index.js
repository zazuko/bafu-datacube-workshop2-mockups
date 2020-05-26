import Vue from 'vue'
import VueRouter from 'vue-router'
import Mapper from '../views/Mapper.vue'
import Designer from '../views/Designer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'Mapper' }
  },
  {
    path: '/mapper',
    name: 'Mapper',
    component: Mapper
  },
  {
    path: '/designer',
    name: 'Designer',
    component: Designer
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
