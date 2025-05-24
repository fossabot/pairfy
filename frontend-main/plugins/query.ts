// plugins/query.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

export default defineNuxtPlugin(() => {
  const apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: "/api/query/getProduct",
      fetch,
      credentials: "include", 
    }),
    cache: new InMemoryCache(),
  });

  return {
    provide: {
      apollo: apolloClient,
    },
  };
});
