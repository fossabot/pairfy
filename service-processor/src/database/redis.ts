import type { RedisOptions } from 'ioredis';

export const connection: RedisOptions = {
  host: 'service-processor-redis.default.svc.cluster.local',
  port: 6379,
  maxRetriesPerRequest: null,
};
