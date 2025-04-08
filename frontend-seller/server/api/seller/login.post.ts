import { getRequestHeaders, readBody, appendResponseHeader } from 'h3'

function normalizeHeaders(
  raw: Partial<Record<string, string | undefined>>
): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(raw)) {
    if (value !== undefined) {
      result[key] = value
    }
  }
  return result
}


export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const headers = normalizeHeaders(getRequestHeaders(event))

  const response = await $fetch('http://service-seller.default.svc.cluster.local:8000/api/seller/login-seller', {
    method: 'POST',
    body,
    headers,
    credentials: 'include'
  }) as Response // or as any, or as LoginResponse

  const setCookie = response.headers?.get?.('set-cookie')

  if (setCookie) {
    appendResponseHeader(event, 'set-cookie', setCookie)
  }

  // Cast to correct response shape
  return await response.json?.()
})
