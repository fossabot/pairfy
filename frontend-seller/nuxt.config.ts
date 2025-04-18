// https://nuxt.com/docs/api/configuration/nuxt-config

import wasm from "vite-plugin-wasm";

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    serviceSellerBase: process.env.NUXT_SERVICE_SELLER_BASE,
    serviceProductBase: process.env.NUXT_SERVICE_PRODUCT_BASE,
    serviceLlmBase: process.env.NUXT_SERVICE_LLM_BASE,
    public: {
      apiBaseBrowser: "",
      validWallets: ["lace", "nami", "eternl"],
    },
  },
  css: [
    "~/assets/css/main.css", // global CSS
  ],
  modules: ["@pinia/nuxt"],
  vite: {
    plugins: [wasm()],
    build: {
      target: "esnext",
    },
  },
});
