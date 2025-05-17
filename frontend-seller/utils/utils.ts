export function truncateByWords(title: string, wordCount: number): string {
  if (!title || wordCount <= 0) return "";

  const words = title.trim().split(/\s+/);
  return words.slice(0, wordCount).join(" ");
}

