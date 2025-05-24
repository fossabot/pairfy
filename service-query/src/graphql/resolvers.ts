import { searchProducts } from "./product/searchProducts.js";
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
    searchProducts
  },
};

const assets = {
  Query: {
    getAssetPrice,
  },
};

export { products, assets, feed };
