import { Queue } from 'bullmq';
import { connection } from '../database/redis.js';

export const mediaQueue = new Queue('media-processing', { connection });