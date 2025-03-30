import { searchProduct } from "./product/searchProduct.js";
import { getProduct } from "./product/getProduct.js";
import { getAssetPrice } from "./price/index.js";


const products = {
  Query: {
    getProduct,
    searchProduct
  },
};

const assets = {
  Query: {
    getAssetPrice,
  },
};

export { products, assets };
