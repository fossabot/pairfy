import { gql } from "graphql-tag";
import { getServiceProductClient } from "./client";
import { throwRemoteError } from "~/server/utils/fetch";

const GET_PRODUCT_QUERY = gql`
  query GetProduct($getProductVariable: GetProductInput!) {
    getProduct(getProductInput: $getProductVariable) {
      id
      group_id
      media_group_id
      media_position
      status
      moderated
      thumbnail_url
      name
      price
      sku
      model
      brand
      description
      category
      bullet_list
      color
      condition_
      country
      origin
      city
      postal
      discount
      discount_value
      discount_percent
      created_at
    }
  }
`;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const client = getServiceProductClient(event);

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
