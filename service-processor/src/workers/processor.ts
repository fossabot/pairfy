import { Worker } from 'bullmq';
import { handleImageJob } from '../jobs/imageJob.js';
import { handleVideoJob } from '../jobs/videoJob.js';
import { connection } from '../database/redis.js';
import { main } from '../index.js';

main();

new Worker('media-processing', async job => {
  if (job.name === 'image') return await handleImageJob(job);
  if (job.name === 'video') return await handleVideoJob(job);
  throw new Error(`Unknown job type: ${job.name}`);
}, { connection });

console.log('🛠 service-processor worker listening to media-processing queue...');
