// plugins/csl.client.ts
import * as CSL from '@emurgo/cardano-serialization-lib-browser'

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return
  nuxtApp.provide('csl', CSL)
})
