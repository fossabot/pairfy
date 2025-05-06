import { Queue } from 'bullmq';
import { connection } from '../database/redis';

export const mediaQueue = new Queue('media-processing', { connection });