import type { Readable } from 'stream';
import { minioClient } from '../database/minio.js';

export async function uploadToSpaces({ bucket, key, body, contentType }: {
  bucket: string,
  key: string,
  body: Buffer | Readable,
  contentType: string,
}): Promise<string> {
  
  if (!bucket || !key || !body || !contentType) {
    throw new Error('Missing required parameters for uploadToSpaces');
  }
  
  const size = Buffer.isBuffer(body) ? body.length : -1;

  await minioClient.client.putObject(bucket, key, body, size, {
    'Content-Type': contentType,
    'x-amz-acl': 'public-read',
  });
  

  return key;
}
