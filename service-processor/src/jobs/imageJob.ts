import getStream from 'get-stream';
import { uploadToSpaces } from '../utils/upload';
import { resizeImage } from '../utils/image';
import { minioClient } from '../database/minio';

export async function handleImageJob(job: Job) {
  const { bucket, key, userId } = job.data;

  const stream = await minioClient.getObject(bucket, key);
  const buffer = await getStream.buffer(stream);

  const resized = await resizeImage(buffer);

  const urls: Record<string, string> = {};
  for (const [size, buf] of Object.entries(resized)) {
    const baseName = key.split('/').pop()?.split('.')[0];
    const destKey = `products/images/${userId}/${baseName}-${size}.webp`;

    urls[size] = await uploadToSpaces({
      bucket: 'media',
      key: destKey,
      body: buf,
      contentType: 'image/webp',
    });
  }

  //createEvent

  return { status: 'done', uploaded: urls };
}
