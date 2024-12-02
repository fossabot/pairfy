import { createStore } from "vuex";
import { product } from "@/views/product/store/index";

const stores = createStore({
  modules: {
    product
  },
});

export { stores };
