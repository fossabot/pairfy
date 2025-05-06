import { minioClient } from "../database/minio";

export async function uploadToSpaces({ bucket, key, body, contentType }: {
  bucket: string,
  key: string,
  body: Buffer | NodeJS.ReadableStream,
  contentType: string,
}): Promise<string> {
  await minioClient.putObject(bucket, key, body, {
    'Content-Type': contentType,
    'x-amz-acl': 'public-read',
  });
  return `https://${bucket}.nyc3.digitaloceanspaces.com/${key}`;
}