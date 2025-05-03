import { gql } from 'graphql-tag'
import { getServiceProductClient } from './client'
import { throwRemoteError } from '~/server/utils/fetch'

const GET_PRODUCTS_QUERY = gql`
  query GetProducts($getProductsVariable: GetProductsInput!) {
    getProducts(getProductsInput: $getProductsVariable) {
      products {
        id
        status
        moderated
        thumbnail_url
        name
        price
        sku
        model
        brand
        category
        condition_
        discount
        discount_value
        discount_percent
        created_at
      }
      nextCursor
      hasMore
      totalCount
    }
  }
`

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const client = getServiceProductClient(event)

  try {
    const res = await client.query({
      query: GET_PRODUCTS_QUERY,
      variables: {
        getProductsVariable: body
      },
      fetchPolicy: 'network-only',
    })

    return res.data?.getProducts
  } catch (err) {
    throwRemoteError(err)
  }
})
