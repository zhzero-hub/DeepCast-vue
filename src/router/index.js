import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/SystemController',
    name: 'SystemController',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/system/SystemController.vue')
  },
  {
    path: '/ServiceController',
    name: 'SystemController',
    component: () => import('../components/service/ServiceController')
  },
  {
    path: '/PlayerController',
    name: 'PlayerController',
    component: () => import('../components/player/PlayerController')
  }
]

const router = new VueRouter({
  routes
})

export default router
