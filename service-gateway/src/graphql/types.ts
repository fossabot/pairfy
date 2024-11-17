const typeDefs = `#graphql

input GetProductsInput {
  cursor: String!
}  

input GetOrdersInput {
  id: String!
} 
  
type Query {
  getOrders: String
}

#/////////////////////////////////////////////////


#/////////////////////////////////////////////////

`;


export { typeDefs }