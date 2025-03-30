import { searchProduct } from "./product/searchProduct.js";
import { getProduct } from "./product/getProduct.js";
import { getAssetPrice } from "./price/index.js";
import { getFeed } from "./feed/getFeed.js";




const feed = {
  Query: {
    getFeed
  },
};

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

export { products, assets, feed };
