import { getRequestHeaders, appendResponseHeader } from 'h3'

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
  const headers = normalizeHeaders(getRequestHeaders(event))

  const response = await $fetch('http://service-seller.default.svc.cluster.local:8000/api/seller/logout', {
    method: 'GET',
    credentials: 'include',
    headers
  }) as any // 👈 prevents 'unknown' error

  const setCookie = response?.headers?.get?.('set-cookie')
  if (setCookie) {
    appendResponseHeader(event, 'set-cookie', setCookie)
  }

  // if response is empty (204), return default
  return typeof response === 'object' ? response : { success: true }
})
