import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = useState<boolean>("isAuthenticated", () => false);
  const seller = useState<any>("seller", () => null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const config = useRuntimeConfig();

  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch("/api/seller/login-seller", {
        method: "POST",
        body: credentials,
        credentials: "include",
      });

      console.log(data);

      await fetchProfile();
      isAuthenticated.value = true;
    } catch (err: any) {
      isAuthenticated.value = false;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchProfile = async () => {
    if (!import.meta.server) return;

    try {
      const data = await $fetch(
        `${config.serviceSellerBase}/seller/current-seller`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      seller.value = data;
      isAuthenticated.value = true;
    } catch (err: any) {
      console.log(err);
      isAuthenticated.value = false;
      seller.value = null;
    }
  };

  const logout = async () => {
    try {
      await $fetch(`${config.serviceSellerBase}/seller/logout-seller`, {
        method: "GET",
        credentials: "include",
      });
    } catch {
      // si falla, igual se limpia
    }

    isAuthenticated.value = false;
    seller.value = null;
  };

  return {
    isAuthenticated,
    seller,
    loading,
    error,
    login,
    logout,
    fetchProfile,
  };
});
