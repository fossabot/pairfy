import dotenv from 'dotenv';
import { minioClient } from './database/minio.js';
dotenv.config();

export function main() {
    const requiredVars = [
      'REDIS_HOST',
      'MINIO_HOST_URL',
      'MINIO_PORT',
      'MINIO_USE_SSL',
      'MINIO_ACCESS_KEY',
      'MINIO_SECRET_KEY',
    ];
  
    const missing = requiredVars.filter((key) => !process.env[key]);
  
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }


    minioClient.connect({
      endPoint: process.env.MINIO_HOST_URL as string,
      port: parseInt(process.env.MINIO_PORT as string, 10),
      useSSL: process.env.MINIO_USE_SSL === "true",
      accessKey: process.env.MINIO_ACCESS_KEY as string,
      secretKey: process.env.MINIO_SECRET_KEY as string,
    });

    
    console.log("Online")
  }
  

