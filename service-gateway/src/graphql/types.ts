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


type ProductBook {
   id: String!
   name: String!
   price: Int!
   collateral: Int!
   sku: String!
   media_url: String!
   image_path: String!
   image_set: String!
   discount: Boolean!
   discount_value: Int!   
   created_at: String!
   book_keeping_stock: Int!
   book_ready_stock: Int!
   book_blocked_stock: Int!
}

type GetBooksResponse {
  books: [ProductBook!]
  cursor: String!
  count: Int!
}

type Order {
  id: String!
  finished: Boolean!
  scanned_at: Float!
  status_log: String!
  ada_price: Float!
  contract_address: String!
  contract_state: Int
  contract_price: Int!
  contract_collateral: Int!
  contract_units: Int!
  product_id: String!
  product_name: String!
  product_price: Int!
  product_collateral: Int!
  product_sku: String!
  product_model: String!
  product_brand: String!
  product_features: String!
  product_bullet_list: String!
  product_discount: Boolean!
  product_discount_value: Int!
  watch_until: Float!
  pending_until: Float!
  shipping_until: Float!
  pending_tx: String
  pending_block: String
  shipping_tx: String
  shipping_block: String
  shipping_metadata: String
}

type getOrderResponse {
  order: Order!
  shipping: String
  address: String
}

input GetBooksInput {
  cursor: String!
}  

input GetOrdersInput {
  id: String!
} 

input GetOrderInput {
  id: String!
} 

type Query {
  getOrder(getOrderInput: GetOrderInput!): getOrderResponse!
  getOrders: String
  getBooks(getBooksInput: GetBooksInput!): GetBooksResponse!
}

#///////////////////////////////////////////////// MUTATIONS

type UpdateBookResponse {
  success: Boolean!
}

input UpdateBookInput {
  id: String!
  keeping_stock: Int!
  ready_stock: Int!
  disable_purchases: Boolean!
} 

type CreateOrderPayload {
  cbor: String!
  order: String!
}

type CborPayload {
  cbor: String!
}

type CreateOrderResponse {
  success: Boolean!
  payload: CreateOrderPayload!
}

type ReturnFundsResponse {
  success: Boolean!
  payload: CborPayload!
}

type LockingFundsResponse {
  success: Boolean!
  payload: CborPayload!
}

type DispatchProductResponse {
  success: Boolean!
  payload: CborPayload!
}

input CreateOrderInput {
  product_id: String!
  product_units: Int!
} 

input ReturnFundsInput {
  order_id: String!
} 

input LockingFundsInput {
  order_id: String!
} 

input DispatchProductInput {
  order_id: String!
  guide: String!
  date: String!
  website: String!
  notes: String!
} 

type Mutation {
  updateBook(updateBookInput: UpdateBookInput!): UpdateBookResponse!
  createOrder(createOrderInput: CreateOrderInput!): CreateOrderResponse!
  returnFunds(returnFundsInput: ReturnFundsInput!): ReturnFundsResponse!
  lockingFunds(lockingFundsInput: LockingFundsInput!): LockingFundsResponse!
  dispatchProduct(dispatchProductInput: DispatchProductInput!): DispatchProductResponse!
}

`;

export { typeDefs };
