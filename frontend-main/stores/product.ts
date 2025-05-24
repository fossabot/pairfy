import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    product: null,
    media: [],
  }),
  actions: {
    setProductData(data: any) {
      this.product = data.product;
      this.media = data.media;
    },
    clear() {
      this.product = null;
      this.media = [];
    },
  },
});
