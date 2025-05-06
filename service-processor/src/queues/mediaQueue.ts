import { Queue } from 'bullmq';
import { connection } from '../config/redis.js';
export const mediaQueue = new Queue('media-processing', { connection });