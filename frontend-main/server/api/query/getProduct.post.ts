/*import { gql } from "graphql-tag";
import { throwRemoteError } from "~/server/utils/fetch";



export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const client = serviceQueryClient(event);

  try {
    const res = await client.query({
      query: GET_PRODUCT_QUERY,
      variables: {
        getProductVariable: body,
      },
      fetchPolicy: "network-only",
    });

    return res.data?.getProduct;
  } catch (err) {
    throwRemoteError(err);
  }
});

*/

// server/api/query/getProduct.ts
export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig();
  
  const body = await readBody(event);

  const cookies = parseCookies(event);
  const sessionCookie = cookies.session;

  const response = await $fetch(`${config.serviceQueryBase}/query/graphql`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
      Cookie: sessionCookie ? `session=${sessionCookie}` : "",
    },
    credentials: "include",
  });

  return response;
});
