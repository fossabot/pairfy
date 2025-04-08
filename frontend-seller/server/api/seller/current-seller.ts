import { getRequestHeaders } from 'h3'

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

  // Call the internal service-seller backend using Kubernetes DNS
  const response = await $fetch('http://service-seller.default.svc.cluster.local:8000/api/seller/current-seller', {
    credentials: 'include',
    headers
  })

  return response
})
