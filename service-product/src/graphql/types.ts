const typeDefs = `#graphql

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

type Book {
    title: String
    autor: String
}
type Query {
  getProduct(id: String): [Product]
  books: [Book]
}

#/////////////////////////////////////////////////

type CreateProductResponse {
  success: Boolean!
}

input CreateProductInput {
  name: String!
  price: Int! 
  collateral: Int!
  sku: String!              
  model: String!
  brand: String!
  features: String!
  category: String!
  keywords: String!
  stock: Int!
  color: String!
  color_name: String!
  quality: String!
  image_set: String!
  video_set: String!
}

type Mutation {
  createProduct(createProductInput: CreateProductInput!): CreateProductResponse!
}

#/////////////////////////////////////////////////

`;


export { typeDefs }