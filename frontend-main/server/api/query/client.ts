import pkg from "@apollo/client/core/core.cjs";
import fetch from "cross-fetch";
import { H3Event } from "h3";


const { ApolloClient, InMemoryCache, createHttpLink } = pkg;

export const serviceQueryClient = (event: H3Event) => {
  const config = useRuntimeConfig();

  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: `${config.serviceQueryBase}/query/graphql`,
      fetch
    }),
    cache: new InMemoryCache(),
  });
};
