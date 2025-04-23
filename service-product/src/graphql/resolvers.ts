import { getProduct, getProducts } from "./handlers/get-product.js";
import { createProduct } from "./handlers/create-product.js";
import { updateProduct } from "./handlers/update-product.js";
import { deleteProduct } from "./handlers/delete-product.js";

const products = {
  Query: {
    getProducts,
    getProduct,
  },
  Mutation: {
    createProduct,
    updateProduct,
    deleteProduct,
  },
};

export { products };
