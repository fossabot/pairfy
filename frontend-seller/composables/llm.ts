export const useProductDescriptionStream = async (
  prompt: string,
  onChunk: (text: string) => void
) => {
  const response = await fetch('/api/llm/product-description', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  const reader = response.body?.getReader()
  const decoder = new TextDecoder('utf-8')

  if (!reader) return

  let done = false
  while (!done) {
    const { value, done: readerDone } = await reader.read()
    if (value) {
      const chunk = decoder.decode(value, { stream: true })
      onChunk(chunk)
    }
    done = readerDone
  }
}
