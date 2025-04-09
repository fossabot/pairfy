export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  console.log('🧪 config.serviceSellerBase:', config.serviceSellerBase)

  const body = await readBody(event)

  const response = await $fetch(`${config.serviceSellerBase}/seller/login-seller`, {
    method: 'POST',
    body,
    credentials: 'include',
    headers: {
      cookie: getHeader(event, 'cookie') || '',
    },
  })

  return response
})
