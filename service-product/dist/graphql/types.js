export const typeDefs = `#graphql

type Product {
  id: String
  seller_id: String
  name: String
  model: String
  features: String
  terms_of_sale: String
  guarantee: String
  category: String
  price: Int
  collateral: Int
  discount: Int
  stock: Int
  keywords: String
  media_url: String
  media_path: String
  image_main: String
  image_set: String
  video_set: String
}


type Query {
  getProduct(id: String): [Product]
}

type Mutation {
  createProduct(name: String!): Product!
}

`;
//# sourceMappingURL=types.js.map