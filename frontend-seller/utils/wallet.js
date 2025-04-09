export const wallet = {
  get(key) {
    if (import.meta.client) {
      return localStorage.getItem(key);
    }
    return null;
  },
  connect(key, value) {
    if (import.meta.client) {
      localStorage.setItem(key, value);
      console.log("WALLET_CONNECTED");
    }
  },
  remove(key) {
    if (import.meta.client) {
      localStorage.removeItem(key);
    }
  },
};
