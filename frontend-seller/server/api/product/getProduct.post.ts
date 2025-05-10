import { gql } from 'graphql-tag'
import { getServiceProductClient } from './client'
import { throwRemoteError } from '~/server/utils/fetch'

const GET_PRODUCT_QUERY = gql`
  query GetProduct($getProductVariable: GetProductInput!) {
    getProduct(getProductInput: $getProductVariable) {
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
  }
`

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const client = getServiceProductClient(event)

  try {
    const res = await client.query({
      query: GET_PRODUCT_QUERY,
      variables: {
        getProductVariable: body
      },
      fetchPolicy: 'network-only',
    })

    return res.data?.getProduct
  } catch (err) {
    throwRemoteError(err)
  }
})
