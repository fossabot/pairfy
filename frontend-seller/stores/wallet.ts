// stores/wallet.ts
import { defineStore } from "pinia";

export const useWalletStore = defineStore("wallet", () => {
  const connected = ref(false);
  const address = ref<string | null>(null);
  const walletApi = ref<any>(null);
  const walletName = ref<string | null>(null);

  const connect = (name: string) => {
    try {
      console.log(name);
      connected.value = true;
    } catch (err) {
      console.error("❌ Error conectando wallet:", err);
    }
  };

  const disconnect = () => {
    connected.value = false;
    address.value = null;
    walletApi.value = null;
    walletName.value = null;
  };

  return {
    connected,
    address,
    walletApi,
    walletName,
    connect,
    disconnect,
  };
});
