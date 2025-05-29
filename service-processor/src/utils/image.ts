import sharp from "sharp";

const sizes = {
  thumbnail: { width: 100, height: 100 },
  small: { width: 250, height: 250 },
  medium: { width: 500, height: 500 },
  large: { width: 1000, height: 1000 },
};

export async function resizeImage(
  buffer: Buffer
): Promise<Record<string, Buffer>> {
  const entries = await Promise.all(
    Object.entries(sizes).map(async ([key, { width, height }]) => {
      const resized = await sharp(buffer)
        .resize({ width, height, fit: "inside", withoutEnlargement: true, background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toFormat("webp", { quality: 80, nearLossless: true })
        .toBuffer();
      return [key, resized] as const;
    })
  );
  return Object.fromEntries(entries);
}
