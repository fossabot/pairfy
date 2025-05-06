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
  }
  

  main();