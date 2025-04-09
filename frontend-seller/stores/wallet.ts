// stores/wallet.ts
import { defineStore } from "pinia";
import { Buffer } from "buffer";

export const useWalletStore = defineStore("wallet", () => {
  const connected = ref(false);
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
    const { $connector } = getContext();

    return new Promise<void>(async (resolve, reject) => {
      try {
        await $connector.connect(name, "testnet", async () => {
          walletApi.value = await window.cardano[name].enable();

          if (import.meta.client) {
            localStorage.setItem("enabled-wallet", name);
          }

          console.log("WALLET_ENABLED", name);

          connected.value = true;
          walletName.value = name;

          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  const sign = async () => {
    try {
      if (!walletApi.value) {
        throw new Error("WalletNotEnabled");
      }

      return await signMessage();
    } catch (err: any) {
      throw err;
    }
  };

  const disconnect = () => {
    connected.value = false;
    walletApi.value = null;
    walletName.value = null;
  };

  return {
    connected,
    walletApi,
    walletName,
    connect,
    sign,
    disconnect,
  };
});
