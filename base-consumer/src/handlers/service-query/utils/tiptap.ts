export function extractEmbeddingTextFromTiptap(node: any): string {
  if (!node) return "";

  if (node.type === "text") {
    return node.text || "";
  }

  const ignoredTypes = ["mention", "image", "video", "codeBlock", "horizontalRule"];
  if (ignoredTypes.includes(node.type)) return "";

  let result = "";

  if (Array.isArray(node.content)) {
    for (const child of node.content) {
      let childText = extractEmbeddingTextFromTiptap(child).trim();
      if (!childText) continue;

      if (["paragraph", "heading", "blockquote", "listItem"].includes(child.type)) {
        childText = ensureFinalPunctuation(childText);
      }

      result += childText + " ";
    }
  }

  return result.replace(/\s+/g, " ").trim();
}

function ensureFinalPunctuation(text: string): string {
  return /[.?!…]["')\]]*\s*$/.test(text) ? text : text + ".";
}
