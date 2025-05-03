import { Client, Client as MinioClient } from "minio";

interface MinioOptions {
  endPoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
}

export class MinioWrap {
  private _client?: MinioClient;

  get client(): MinioClient {
    if (!this._client) {
      throw new Error("Cannot access the MinIO client before connecting");
    }
    return this._client;
  }

  connect(options: MinioOptions): MinioClient {
    this._client = new MinioClient(options);
    return this.client;
  }
}


export const minioClient = new MinioWrap()



export async function ensureBucketExists(client: Client, bucketName: string): Promise<void> {
  const exists = await client.bucketExists(bucketName);
  if (!exists) {
    await client.makeBucket(bucketName, "");
    console.log(`🪣 Created bucket: ${bucketName}`);
  }
}