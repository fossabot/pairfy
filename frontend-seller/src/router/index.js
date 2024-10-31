import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/entry',
      name: 'entry',
      component: () => import('../views/EntryView.vue')
    },

    {
      path: '/create-product',
      name: 'create-product',
      component: () => import('../views/CreateProduct.vue')
    }
  ]
})

export default router
