import sharp from 'sharp';

const sizes = {
  thumbnail: { width: 50, height: 50 },
  thumb: { width: 150, height: 150 },
  medium: { width: 500, height: 500 },
  large: { width: 1000, height: 1000 },
};

export async function resizeImage(buffer: Buffer): Promise<Record<string, Buffer>> {
  const output: Record<string, Buffer> = {};
  for (const [key, { width, height }] of Object.entries(sizes)) {
    output[key] = await sharp(buffer).resize(width, height, { fit: 'cover' }).toFormat('webp').toBuffer();
  }
  return output;
}