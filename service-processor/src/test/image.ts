import { connection } from '../database/redis';
import { Queue } from 'bullmq';

const mediaQueue = new Queue('media-processing', { connection });

(async () => {
  await mediaQueue.add('image', {
    bucket: 'media',
    key: 'uploads/test-product.jpg',
    userId: '123456',
  }, {
    attempts: 5,
    backoff: {
      type: 'exponential',
      delay: 3000,
    },
  });

  console.log('Job enviado exitosamente.');
  process.exit(0);
})();
