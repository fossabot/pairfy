import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { HOST } from '../api';

const cache = new InMemoryCache();

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
    // Is being rendered on the server?
    ssr: false,
}

const clientProductOptions = {
    uri: HOST + '/api/product/graphql',
    cache
}

const clientBlockchainOptions = {
    uri: 'http://example.org/graphql',
    cache
}

const productClient = new ApolloClient({
    ...defaultOptions,
    ...clientProductOptions,
});

const blockchainClient = new ApolloClient({
    ...defaultOptions,
    ...clientBlockchainOptions,
});



export { productClient, blockchainClient }