import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => ({
    query: null,
    prompt: null,
    result: [],
  }),
  actions: {
    setResultData(data: any) {
      this.result = data;
    },
    setQuery(data: any) {
      this.query = data;
    },
    setPrompt(data: any) {
      this.prompt = data;
    },
    clear() {
      this.query = null;
      this.prompt = null;
      this.result = [];
    },
  },
});
