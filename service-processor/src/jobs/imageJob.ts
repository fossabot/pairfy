import { uploadToSpaces } from "../utils/upload.js";
import { resizeImage } from "../utils/image.js";
import { minioClient } from "../database/minio.js";
import { createEvent, logger } from "@pairfy/common";
import { Readable } from "stream";
import { Job } from "bullmq";

export const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks: Buffer[] = [];

  for await (const chunk of stream) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
};

export async function handleImageJob(job: Job) {
  try {
    const { bucket, file } = job.data;

    const {  id, media_group_id, filename, media_path, agent_id } = file;

    const stream = await minioClient.client.getObject(bucket, media_path);
    const buffer = await streamToBuffer(stream);
    const resized = await resizeImage(buffer); 

    const urls: Record<string, string> = {};

    for (const [size, buf] of Object.entries(resized)) {

      const originalName = filename.split(".")[0];

      const destKey = `groups/${media_group_id}/${id}-${originalName}-${size}.webp`;

      const url = await uploadToSpaces({
        bucket,
        key: destKey,
        body: buf,
        contentType: "image/webp",
      });

      urls[size] = url;
    }

    console.log(urls)

    const timestamp = Date.now()

    const payload = {
      file,
      urls
    }
    await createEvent(
      connection,
      timestamp,
      "service-processor",
      "FileProcessed",
      JSON.stringify(payload),
      agent_id
    );

    return { status: "done", uploaded: urls };
  } catch (err) {
    logger.error(
      {
        error: err instanceof Error ? err : new Error(String(err)),
        jobId: job.id,
        jobName: job.name,
        jobData: job.data,
      },
      `❌ Failed to process image job`
    );

    throw err;
  }
}
