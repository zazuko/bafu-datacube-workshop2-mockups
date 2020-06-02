import Vue from 'vue'
import VueRouter from 'vue-router'
import Mapper from '../views/Mapper.vue'
import Designer from '../views/Designer.vue'
import SourcesSettings from '../views/SourcesSettings.vue'

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
  },
  {
    path: '/sources-settings',
    name: 'SourcesSettings',
    component: SourcesSettings
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
