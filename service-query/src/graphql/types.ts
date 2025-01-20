const typeDefs = `#graphql

type Product {
    id: String!
    state: String!
    state_label: String!
    moderated: Int!
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
    bullet_list: String!
    paused: Int!
    color: String!
    color_name: String!
    quality: String!
    country: String!
    media_url: String!
    image_path: String!
    video_path: String!
    image_set: String!
    video_set: String!
    discount: Boolean!
    discount_value: Int!
    created_at: String!
}

type GetProductPageResponse {
    success: Boolean!
    payload: String!
}

type SearchProductResponse {
    success: Boolean!
    payload: String!
}

input GetProductInput {
  id: String!
} 

input GetProductPageInput {
  product_id: ID!
} 

input SearchProductInput {
  text: String!
} 

type Query {
  getProduct(getProductInput: GetProductInput!): Product!
  getProductPage(getProductPageInput: GetProductPageInput!): GetProductPageResponse!
  searchProduct(searchProductInput: SearchProductInput!): SearchProductResponse!
  getAssetPrice: Float!
}

#/////////////////////////////////////////////////

`;

export { typeDefs };
