import Vue from 'vue'
import VueRouter from 'vue-router'
import Cubes from '../views/Cubes.vue'
import Cube from '../views/Cube.vue'
import Mapper from '../views/Mapper.vue'
import Designer from '../views/Designer.vue'
import DimensionManager from '../views/DimensionManager.vue'
import ManagedDimension from '../views/ManagedDimension.vue'
import SourcesSettings from '../views/SourcesSettings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'Cubes' }
  },
  {
    path: '/cubes',
    name: 'Cubes',
    component: Cubes,
  },
  {
    path: '/cubes/:uri',
    name: 'Cube',
    component: Cube,
    children: [
      {
        path: 'mapper',
        name: 'Mapper',
        component: Mapper
      },
      {
        path: 'designer',
        name: 'Designer',
        component: Designer
      },
    ],
  },
  {
    path: '/dimension-manager',
    name: 'DimensionManager',
    component: DimensionManager
  },
  {
    path: '/managed-dimension/:uri',
    name: 'ManagedDimension',
    component: ManagedDimension,
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
