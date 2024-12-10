import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../views/product/ProductView.vue'),
    },
    {
      path: '/order/:id',
      name: 'order',
      component: () => import('../views/order/OrderView.vue'),
    },
  ],
})

export default router
