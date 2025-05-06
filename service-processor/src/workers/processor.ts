import { Worker } from 'bullmq';
import { handleImageJob } from '../jobs/imageJob';
import { handleVideoJob } from '../jobs/videoJob';
import { connection } from '../database/redis';

new Worker('media-processing', async job => {
  if (job.name === 'image') return await handleImageJob(job);
  if (job.name === 'video') return await handleVideoJob(job);
  throw new Error(`Unknown job type: ${job.name}`);
}, { connection });

console.log('🛠 service-processor worker listening to media-processing queue...');
