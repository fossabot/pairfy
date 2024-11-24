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
    discount: Boolean!
    discount_value: Int!
    created_at: String!
}


input GetProductsInput {
  cursor: String!
}  

input GetOrdersInput {
  id: String!
} 

type GetProductsResponse {
  products: [Product]
  cursor: String!
  count: Int!
}

type Query {
  getOrders: String
  getProducts(getProductsInput: GetProductsInput!): GetProductsResponse!
}

#/////////////////////////////////////////////////


#/////////////////////////////////////////////////

`;


export { typeDefs }