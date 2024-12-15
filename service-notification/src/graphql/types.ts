const typeDefs = `#graphql

input GetOrdersInput {
  id: String!
} 

type Query {
  getOrders: String
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

type Mutation {
  updateBook(updateBookInput: UpdateBookInput!): UpdateBookResponse!
}

`;

export { typeDefs };
