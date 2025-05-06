import { uploadToSpaces } from '../utils/upload';
import { resizeImage } from '../utils/image';
import { minioClient } from '../database/minio';
import { logger } from '@pairfy/common';
import { Readable } from 'stream';
import { Job } from 'bullmq';

export const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks: Buffer[] = [];

  for await (const chunk of stream) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
};


export async function handleImageJob(job: Job) {
  try {
    const { bucket, key, userId } = job.data;

    const stream = await minioClient.client.getObject(bucket, key);
    const buffer = await streamToBuffer(stream);
    const resized = await resizeImage(buffer);

    const urls: Record<string, string> = {};
    const baseName = key.split('/').pop()?.split('.')[0] || 'image';

    for (const [size, buf] of Object.entries(resized)) {
      const destKey = `products/images/${userId}/${baseName}-${size}.webp`;

      urls[size] = await uploadToSpaces({
        bucket: 'media',
        key: destKey,
        body: buf,
        contentType: 'image/webp',
      });
    }

    // createEvent(urls)

    return { status: 'done', uploaded: urls };

  } catch (err) {
    logger.error(`Error processing job ${job.id}:`, err);
    throw err; 
  }
}
