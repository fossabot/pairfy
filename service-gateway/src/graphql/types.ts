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


type ProductBook {
   id: String!
   name: String!
   price: Int!
   collateral: Int!
   sku: String!
   media_url: String!
   image_path: String!
   image_set: String!
   created_at: String!
   book_product_stock: Int!
   book_ready_stock: Int!
   book_blocked_orders: Int!
}

type GetBooksResponse {
  products: [ProductBook!]
  cursor: String!
  count: Int!
}
  
input GetBooksInput {
  cursor: String!
}  

input GetOrdersInput {
  id: String!
} 

type Query {
  getOrders: String
  getBooks(getBooksInput: GetBooksInput!): GetBooksResponse!
}

#/////////////////////////////////////////////////

`;


export { typeDefs }