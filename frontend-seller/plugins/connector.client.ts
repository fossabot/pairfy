import { Wallet } from '@cardano-foundation/cardano-connect-with-wallet-core'

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return

  nuxtApp.provide('connector', Wallet)
})
