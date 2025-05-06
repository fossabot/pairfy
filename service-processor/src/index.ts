import { mediaQueue } from './queues/mediaQueue';

async function testJob() {
  await mediaQueue.add('image', {
    filePath: './uploads/test-image.webp',
    mime: 'image/webp',
    userId: 'test-user',
  });

  console.log('📤 Test job enqueued');
}

testJob();
