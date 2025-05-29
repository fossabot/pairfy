import sanitizeHtml from "sanitize-html";

export function sanitizeTiptapContent(node: any): any {
    const sanitizedNode: any = { ...node };
  
    if (sanitizedNode.text) {
      sanitizedNode.text = sanitizeHtml(sanitizedNode.text, {
        allowedTags: [],
        allowedAttributes: {},
      });
    }
  
    if (sanitizedNode.attrs) {
      for (const key in sanitizedNode.attrs) {
        if (typeof sanitizedNode.attrs[key] === "string") {
          sanitizedNode.attrs[key] = sanitizeHtml(sanitizedNode.attrs[key], {
            allowedTags: [],
            allowedAttributes: {},
          });
        }
      }
    }
  
    if (sanitizedNode.content && Array.isArray(sanitizedNode.content)) {
      sanitizedNode.content = sanitizedNode.content.map(sanitizeTiptapContent);
    }
  
    return sanitizedNode;
  }
  