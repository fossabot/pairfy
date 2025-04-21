const typeDefs = `#graphql

type Product {
  id: ID!
  group_id: String!
  media_group_id: String!
  state: String!
  moderated: Boolean!
  seller_id: String!
  thumbnail_url: String
  name: String!
  price: Int!
  sku: String!
  model: String!
  brand: String!
  description: String!
  category: String!
  bullet_list: [String!]!
  color: String!
  condition_: String!
  country: String!
  city: String!
  postal: String!
  discount: Boolean!
  discount_value: Int!
  created_at: BigInt!
  updated_at: BigInt!
  schema_v: Int!
}


input GetProductsInput {
  cursor: String!
}  

input GetProductInput {
  id: String!
} 
  
type GetProductsResponse {
  products: [Product]
  cursor: String!
  count: Int!
}

type Query {
  getProducts(getProductsInput: GetProductsInput!): GetProductsResponse!
  getProduct(getProductInput: GetProductInput!): Product!
}

#/////////////////////////////////////////////////

type CreateProductResponse {
  success: Boolean!
}

type UpdateProductResponse {
  success: Boolean!
}

type DeleteProductResponse {
  success: Boolean!
}

input CreateProductInput {
  name: String!
  price: Int! 
  sku: String!              
  model: String!
  brand: String!
  features: String!
  category: String!
  keywords: String!
  bullet_list: String!
  paused: Int!
  color: String!
  color_name: String!
  variations: String!
  quality: String!
  image_set: String!
  video_set: String!
  discount: Boolean!
  discount_value: Int!
  shipping_weight: Float!
  shipping_length: Float!
  shipping_width: Float!
  shipping_height: Float!
  shipping_city: String!
  shipping_postal: String!
  shipping_instructions: String!
  shipping_fragile: Boolean!
}

input UpdateProductInput {
  id: ID!
  name: String
  price: Int
  sku: String              
  model: String
  brand: String
  features: String
  category: String
  keywords: String
  bullet_list: String
  paused: Int
  color: String
  color_name: String
  variations: String
  quality: String
  image_set: String
  video_set: String
  discount: Boolean
  discount_value: Int
  shipping_weight: Float
  shipping_length: Float
  shipping_width: Float
  shipping_height: Float
  shipping_city: String
  shipping_postal: String
  shipping_instructions: String
  shipping_fragile: Boolean
}

input DeleteProductInput {
  id: String!
}

type Mutation {
  createProduct(createProductInput: CreateProductInput!): CreateProductResponse!
  updateProduct(updateProductInput: UpdateProductInput!): UpdateProductResponse!
  deleteProduct(deleteProductInput: DeleteProductInput!): DeleteProductResponse!
}

#/////////////////////////////////////////////////

`;


export { typeDefs }