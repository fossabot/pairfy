// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    serviceSellerBase: 'http://service-seller.default.svc.cluster.local:8000/api',
    serviceProductBase: 'http://service-product.default.svc.cluster.local:8000/api',

    public: {
      apiBaseBrowser: ''
    }
  },
  css: [
    '~/assets/css/main.css'  // global CSS
  ],
  modules: ['@pinia/nuxt']
})
