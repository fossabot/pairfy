export const useProductDescriptionStream = async (
  prompt: string,
  onChunk: (text: string) => void
) => {
  try {
    const response = await fetch("/api/llm/product-description", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      throw new Error(`Stream failed: ${response.status} - ${errorText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();

      if (value) {
        const chunk = decoder.decode(value, { stream: true });

        if (!chunk) continue;


        if (chunk.startsWith('{')) {
          try {
            const parsed = JSON.parse(chunk);
            if (parsed?.error) continue;
          } catch {
       
          }
        }

        onChunk(chunk);
      }

      done = readerDone;
    }

  } catch (err) {
    console.error("[Stream Fatal Error]", err);
    throw err;
  }
};
