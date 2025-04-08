// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    serviceSellerBase: process.env.NUXT_SERVICE_SELLER_BASE,
    serviceProductBase: process.env.NUXT_SERVICE_PRODUCT_BASE,
    public: {
      apiBaseBrowser: ''
    }
  },
  css: [
    '~/assets/css/main.css'  // global CSS
  ],
  modules: ['@pinia/nuxt']
})
