// stores/wallet.ts
import { defineStore } from "pinia";
import { Buffer } from "buffer";

export const useWalletStore = defineStore("wallet", () => {
  const connected = ref(false);
  const address = ref<string | null>(null);
  const walletApi = ref<any>(null);
  const walletName = ref<string | null>(null);

  const getContext = () => useNuxtApp();

  const getMessage = () => {
    const message = "SIGN TO AUTHENTICATE YOUR PUBLIC SIGNATURE"; //env variable

    return Buffer.from(message, "utf8").toString("hex");
  };

  const getAddress = async () => {
    if (!walletApi.value) {
      return;
    }

    const address = await walletApi.value.getUsedAddresses();

    return address[0];
  };

  const signMessage = async () => {
    if (!walletApi.value) {
      return;
    }

    const address = await getAddress();

    const signature = await walletApi.value.signData(address, getMessage());

    return [signature, address];
  };

  const connect = async (name: string) => {
    try {
      const { $connector } = getContext();

      await $connector.connect(name, "testnet", async () => { //env variable
        walletApi.value = await window.cardano[name].enable();

        if (import.meta.client) {
          localStorage.setItem("enabled-wallet", name);
        }

        console.log("SIGNATURE " + (await signMessage()));
      });
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
