import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../views/HomeView.vue')
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
    },

    {
      path: '/product-list',
      name: 'product-list',
      component: () => import('../views/ProductList.vue')
    }

  ]
})

export default router
