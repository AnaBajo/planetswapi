import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import OptionsAPIVue from '../views/OptionsApi.vue'
import CompositionApiVue from '../views/CompositionApi.vue'
import PlanetDetailsVue from '@/components/OptionsApi/PlanetDetails.vue'
import CompPlanetDetailsVue from '@/components/CompositionApi/PlanetDetails.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'options',
    component: OptionsAPIVue
  },
  {
    path: '/composition',
    name: 'composition',
    component: CompositionApiVue
  },
  {
    // path: '/planet/:name',
    path: '/options/planet/:id',
    name: 'planet-details',
    component: PlanetDetailsVue,
    props: true
  },
  {
    // path: '/planet/:name',
    path: '/composition/planet/:id',
    name: 'composition-planet-details',
    component: CompPlanetDetailsVue,
    props: true
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
