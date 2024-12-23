const typeDefs = `#graphql

input GetMessagesInput {
  order_id: String!
} 

type Query {
  getMessages(getMessagesInput: GetMessagesInput!): String
}

#///////////////////////////////////////////////// MUTATIONS

type UpdateMessageResponse {
  success: Boolean!
}

input UpdateMessageInput {
  message_id: String!
} 

type Mutation {
  updateMessage(updateMessageInput: UpdateMessageInput!): UpdateMessageResponse!
}

`;

export { typeDefs };
