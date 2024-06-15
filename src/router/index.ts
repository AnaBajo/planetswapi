import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import OptionsAPIVue from '../views/OptionsApi.vue'
import CompositionApiVue from '../views/CompositionApi.vue'
import PlanetDetailsVue from '@/components/PlanetDetails.vue'

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    // path: '/planet/:name',
    path: '/planet/:id',
    name: 'planet-details',
    component: PlanetDetailsVue,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
