import { useAuthStore } from "~/stores/auth"

// plugins/init-auth.ts
export default defineNuxtPlugin(async () => {
    const auth = useAuthStore()
    await auth.fetchProfile()
  })
  