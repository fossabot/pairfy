const typeDefs = `#graphql

type Message {
    id: ID!
    agent: String!
    role: String!
    content: String!
    seen: Boolean!
    created_at: String!
}

input GetMessagesInput {
  session: String!
} 

type Query {
  getMessages(getMessagesInput: GetMessagesInput!): [Message!]
}

#///////////////////////////////////////////////// MUTATIONS

type CreateMessageResponse {
  success: Boolean!
}

type UpdateMessageResponse {
  success: Boolean!
}

input UpdateMessageInput {
  message_id: String!
} 

input CreateMessageInput {
  session: String!
  content: String!
} 

type Mutation {
  createMessage(createMessageInput: CreateMessageInput!): CreateMessageResponse!
  updateMessage(updateMessageInput: UpdateMessageInput!): UpdateMessageResponse!
}

#///////////////////////////////////////////////// SUBSCRIPTIONS
 
type Subscription {
    newMessages(order_id: ID!): Message!
}

`;

export { typeDefs };
