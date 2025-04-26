import pkg from '@apollo/client/core/core.cjs';
import { H3Event, parseCookies } from "h3";
import fetch from "cross-fetch";

const { ApolloClient, InMemoryCache, createHttpLink } = pkg;

export const getServiceProductClient = (event: H3Event) => {
  const config = useRuntimeConfig();
  const cookies = parseCookies(event);
  const sessionCookie = cookies.session;

  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: `${config.serviceProductBase}/product/graphql`,
      fetch,
      headers: {
        cookie: sessionCookie ? `session=${sessionCookie}` : "",
      },
    }),
    cache: new InMemoryCache(),
  });
};
