// plugins/storage.client.ts

import { wallet } from '@/utils/wallet'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('wallet', wallet)
})
