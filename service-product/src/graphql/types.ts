const typeDefs = `#graphql

type Product {
    id: String!
    seller_id: String!
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
    country: String!
    moderated: Int!
    visible: Int!
    media_url: String!
    image_path: String!
    video_path: String!
    image_set: String!
    video_set: String!
    created_at: String!
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
  getProduct(getProductInput: GetProductInput!): [Product]
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