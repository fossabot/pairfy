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

type ProductSource {
  id: ID!
  name: String!
  sku: String!
  category: String!
  brand: String!
  model: String!
  price: Float!
  quality: String!
  image: String!
  keywords: String!
  rating: Float!
  reviews: Int!
  discount: Boolean!
  discount_value: Int!
  best_seller: Boolean!
}

type SearchProductResponse {
  _source: ProductSource!
}

input GetProductInput {
  id: String!
} 

input StringFilterInput {
  enabled: Boolean!
  value: String
}

input BooleanFilterInput {
  enabled: Boolean!
  value: Boolean
}

input PriceFilterInput {
  enabled: Boolean!
  value: PriceRangeInput
}

input PriceRangeInput {
  gte: Float
  lte: Float
}

input SortInput {
  price: SortOrder!
  rating: SortOrder!
  reviews: SortOrder!
  discount_value: SortOrder!
}

enum SortOrder {
  asc
  desc
}

input SearchProductInput {
  text: String!
  sku: StringFilterInput
  brand: StringFilterInput
  model: StringFilterInput
  category: StringFilterInput
  quality: StringFilterInput
  discount: BooleanFilterInput
  best_seller: BooleanFilterInput
  price: PriceFilterInput!
  sort: SortInput!
  tag: String!
} 

type Query {
  getProduct(getProductInput: GetProductInput!): Product!
  searchProduct(searchProductInput: SearchProductInput!): [SearchProductResponse]!
  getAssetPrice: Float!
}

#/////////////////////////////////////////////////

`;

export { typeDefs };
