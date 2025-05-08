import sharp from "sharp";

const sizes = {
  thumbnail: { width: 50, height: 50 },
  small: { width: 150, height: 150 },
  medium: { width: 500, height: 500 },
  large: { width: 1000, height: 1000 },
};

export async function resizeImage(
  buffer: Buffer
): Promise<Record<string, Buffer>> {
  const entries = await Promise.all(
    Object.entries(sizes).map(async ([key, { width, height }]) => {
      const resized = await sharp(buffer)
        .resize({ width, height, fit: "cover", withoutEnlargement: true })
        .toFormat("webp", { quality: 80, nearLossless: true })
        .toBuffer();
      return [key, resized] as const;
    })
  );
  return Object.fromEntries(entries);
}
