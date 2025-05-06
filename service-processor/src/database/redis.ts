import Redis from 'ioredis';

export const connection = new Redis('redis://service-processor-redis.default.svc.cluster.local:6379');