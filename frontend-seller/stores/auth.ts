import { ofetch } from "ofetch";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = useState<boolean>("isAuthenticated", () => false);
  const seller = useState<any>("seller", () => null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const config = useRuntimeConfig();

  const login = async (credentials: {
    email: string;
    password: string;
    signature: string;
    address: string;
  }) => {
    loading.value = true;

    try {
      const response: any = await $fetch("/api/seller/login-seller", {
        method: "POST",
        body: credentials,
        credentials: "include",
      });

      console.log(response.data);

      await fetchProfile();
      isAuthenticated.value = true;
    } catch (err: any) {
      isAuthenticated.value = false;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const register = async (credentials: {
    email: string;
    password: string;
    terms_accepted: boolean;
  }) => {
    loading.value = true;

    try {
      const response: any = await $fetch("/api/seller/create-seller", {
        method: "POST",
        body: credentials,
      });

      console.log(response.data);
    } catch (err: any) {
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

  const verify = async (credentials: { token: string }) => {
    loading.value = true;

    try {
      const response: any = await $fetch("/api/seller/verify-seller", {
        method: "POST",
        body: credentials,
        async onResponseError({ response }) {
          throw new Error(JSON.stringify(response._data.data));
        }
      });
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await $fetch(`${config.serviceSellerBase}/seller/logout-seller`, {
        method: "GET",
        credentials: "include",
      });
    } catch {}

    isAuthenticated.value = false;
    seller.value = null;
  };

  return {
    isAuthenticated,
    seller,
    loading,
    error,
    login,
    register,
    logout,
    verify,
    fetchProfile,
  };
});
