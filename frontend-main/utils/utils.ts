// utils/utils.ts
export function truncateByWords(text: string, wordCount: number): string {
  if (!text || wordCount <= 0) return "";
  const words = text.trim().split(/\s+/);
  return words.slice(0, wordCount).join(" ");
}

export function formatUSD(amount: number) {
  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    throw new TypeError("Amount must be a finite number");
  }

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return formatted.replace(/\$/g, "").trim();
}
