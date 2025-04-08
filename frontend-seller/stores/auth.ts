import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = useState<boolean>('isAuthenticated', () => false)
  const seller = useState<any>('seller', () => null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Log in the seller by calling the Nuxt internal API proxy.
   * This will forward the credentials to the backend and return the cookie.
   */
  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true
    error.value = null

    try {
      await $fetch('/api/seller/login', {
        method: 'POST',
        body: credentials,
        credentials: 'include' // ✅ important for session cookie
      })

      await fetchProfile()
      isAuthenticated.value = true
    } catch (err: any) {
      error.value = err.data?.message || 'Login failed'
      isAuthenticated.value = false
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch the current seller profile using the session cookie.
   * Works during SSR or client-side.
   */
  const fetchProfile = async () => {
    try {
      const data = await $fetch('/api/seller/current-seller', {
        credentials: 'include'
      })

      seller.value = data
      isAuthenticated.value = true
    } catch {
      isAuthenticated.value = false
      seller.value = null
    }
  }

  /**
   * Logout the user by calling the internal backend endpoint.
   */
  const logout = async () => {
    try {
      await $fetch('/api/seller/logout', {
        method: 'POST',
        credentials: 'include'
      })
    } catch {
      // even if logout fails, clear local state
    }

    isAuthenticated.value = false
    seller.value = null
  }

  return {
    isAuthenticated,
    seller,
    loading,
    error,
    login,
    logout,
    fetchProfile
  }
})
