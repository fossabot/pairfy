import { gql } from 'graphql-tag'
import { getServiceProductClient } from './client'
import { throwRemoteError } from "~/server/utils/fetch";

const EDIT_PRODUCT_MUTATION = gql`
  mutation($editProductVariable: EditProductInput!) {
    editProduct(editProductInput: $editProductVariable) {
      success
      message
    }
  }
`

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const client = getServiceProductClient(event) 

  try {
    const res = await client.mutate({
      mutation: EDIT_PRODUCT_MUTATION,
      variables: {
        editProductVariable: body
      }
    })

    return res.data?.editProduct
  } catch (err) {
    throwRemoteError(err);
  }
})
