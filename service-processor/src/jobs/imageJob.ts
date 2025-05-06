import fs from 'fs/promises';
import { resizeImage } from '../utils/image-resizer';
import { uploadToSpaces } from '../utils/upload';

export async function handleImageJob(job: any) {
  const { filePath } = job.data;
  const buffer = await fs.readFile(filePath);
  const resized = await resizeImage(buffer);
  const urls: Record<string, string> = {};

  for (const [key, data] of Object.entries(resized)) {
    const filename = `${job.id}-${key}.webp`;
    const path = `products/images/${filename}`;
    urls[key] = await uploadToSpaces({
      bucket: 'ecommerce-assets',
      key: path,
      body: data,
      contentType: 'image/webp',
    });
  }

  return { urls };
}
