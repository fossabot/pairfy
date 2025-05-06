import path from 'path';
import fs from 'fs/promises';
import { createReadStream } from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import { uploadToSpaces } from '../utils/upload';

const resolutions = {
  '480p': { width: 854, height: 480 },
  '720p': { width: 1280, height: 720 },
  '1080p': { width: 1920, height: 1080 },
};

function transcodeVideo(input: string, output: string, width: number, height: number): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .outputOptions([`-vf scale=${width}:${height}`, '-c:v libx264', '-crf 28', '-preset veryfast', '-c:a copy'])
      .on('end', resolve)
      .on('error', reject)
      .save(output);
  });
}

export async function handleVideoJob(job: any) {
  const { filePath } = job.data;
  const ext = path.extname(filePath);
  const urls: Record<string, string> = {};

  await fs.mkdir('./tmp', { recursive: true });

  for (const [label, { width, height }] of Object.entries(resolutions)) {
    const outPath = `./tmp/${job.id}-${label}.mp4`;
    await transcodeVideo(filePath, outPath, width, height);

    const stream = createReadStream(outPath);
    const key = `products/videos/${job.id}-${label}.mp4`;
    urls[label] = await uploadToSpaces({
      bucket: 'ecommerce-assets',
      key,
      body: stream,
      contentType: 'video/mp4',
    });
  }

  return { urls };
}