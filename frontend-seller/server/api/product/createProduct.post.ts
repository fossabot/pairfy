import { gql } from 'graphql-tag'
import { getServiceProductClient } from './client'

const CREATE_PRODUCT_MUTATION = gql`
  mutation($createProductVariable: CreateProductInput!) {
    createProduct(createProductInput: $createProductVariable) {
      success
      data {
        product_id
      }
    }
  }
`

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const client = getServiceProductClient(event) 

  try {
    const res = await client.mutate({
      mutation: CREATE_PRODUCT_MUTATION,
      variables: {
        createProductVariable: body
      }
    })

    return res.data?.createProduct
  } catch (err) {
    console.error('GraphQL error:', err)
    return createError({
      statusCode: 500,
      statusMessage: 'Failed to create product'
    })
  }
})
