import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { HttpLink, split } from '@apollo/client/core'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import { domain, HOST } from '../api'

const cache = new InMemoryCache()

const defaultOptions = {
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  wsEndpoint: null,
  // LocalStorage token
  credentials: 'include',
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,

  ssr: false,
}

const clientQueryOptions = {
  uri: HOST + '/api/query/graphql',
  cache,
}

const clientGatewayOptions = {
  uri: HOST + '/api/gateway/graphql',
  cache,
}

const clientNotificationOptions = {
  uri: HOST + '/api/notification/graphql',
  cache,
}

////////////////////////////////////////////

const queryClient = new ApolloClient({
  ...defaultOptions,
  ...clientQueryOptions,
})

const gatewayClient = new ApolloClient({
  ...defaultOptions,
  ...clientGatewayOptions,
})

const notificationClient = new ApolloClient({
  ...defaultOptions,
  ...clientNotificationOptions,
})

////////////////////////////////////////////WEBSOCKET

const httpLink = new HttpLink({
  uri: HOST + '/api/chat/graphql',
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${domain}/api/chat/graphql`,
  }),
)

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink,
)

const chatClient = new ApolloClient({
  link,
  cache,
})

export { queryClient, gatewayClient, notificationClient, chatClient }
