import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/us',
    },
    {
      path: '/:country',
      name: 'home',
      component: HomeView,
      props: true
    },
    {
      path: '/:country/product/:id',
      name: 'product',
      component: () => import('../views/product/ProductView.vue'),
      props: true,
    },
    {
      path: '/:country/order/:id',
      name: 'order',
      component: () => import('../views/order/OrderView.vue'),
      props: true,
    },
  ],
})

export default router
