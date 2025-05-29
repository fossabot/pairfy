export const useProductDescriptionStream = async (
  prompt: string,
  onChunk: (paragraph: string) => void
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

    let buffer = "";
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (!value) continue;

      const chunk = decoder.decode(value, { stream: true });
      if (!chunk) continue;

      buffer += chunk;
      buffer = flushParagraphsFromBuffer(buffer, onChunk);
    }


    const final = buffer.replace(/\s*\n\s*/g, " ").trim();
    if (final) {
      onChunk(final);
    }

  } catch (err) {
    console.error("[Stream Fatal Error]", err);
    throw err;
  }
};

function flushParagraphsFromBuffer(
  buffer: string,
  onChunk: (text: string) => void
): string {
  while (buffer.indexOf("\n\n") !== -1) {
    const index = buffer.indexOf("\n\n");
    const rawParagraph = buffer.slice(0, index);
    const paragraph = rawParagraph.replace(/\s*\n\s*/g, " ").trim();

    if (paragraph) {
      onChunk(paragraph);
    }

    buffer = buffer.slice(index + 2);
  }

  return buffer;
}
