import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => ({
    prompt: null,
    result: [],
  }),
  actions: {
    setResultData(data: any) {
      this.result = data;
    },
    setPrompt(data: any) {
      this.prompt = data;
    },
    clear() {
      this.prompt = null;
      this.result = [];
    },
  },
});
