export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
  
    const body = await readBody(event)
  
    const response = await $fetch(`${config.serviceSellerBase}/seller/create-seller`, {
      method: 'POST',
      body,
    })
  
    return response
  })
  