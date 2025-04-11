export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
  
    const body = await readBody(event)
  
    const response = await $fetch(`${config.serviceSellerBase}/seller/verify-seller`, {
      method: 'POST',
      body,
      async onResponseError({ response }) {
        console.log("TEST1", response._data)
        throw new Error(JSON.stringify(response._data));
      }
    })
  
    return response
  })
  