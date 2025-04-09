import { Lucid } from 'lucid-cardano'

export default defineNuxtPlugin(async (nuxtApp) => {
  if (!import.meta.client) return // importante para evitar SSR

  nuxtApp.provide('lucid', Lucid)
})
