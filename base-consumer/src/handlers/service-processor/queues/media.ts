import { connection } from "../database/redis.js";
import { logger } from "@pairfy/common";
import { Queue } from "bullmq";

export const mediaQueue = new Queue("media-processing", {
  connection,
});

interface MediaEvent {
  id: string;
  media_group_id: string;
  agent_id: string;
  mime_type: string;
  position: number;
  filename: string;
  media_path: string;
  status: string;
  created_at: number;
}

export async function processFile(event: MediaEvent): Promise<boolean> {
  try {
    const isVideo = event.mime_type.startsWith("video/");
    
    const type = isVideo ? "video" : "image";

    const job = await mediaQueue.add(
      type,
      {
        bucket: "media",
        file: event,
      },
      {
        attempts: 5,
        backoff: {
          type: "exponential",
          delay: 3000,
        },
        removeOnComplete: true,
        removeOnFail: false,
      }
    );

    logger.info({
      timestamp: new Date().toISOString(),
      service: "service-processor-consumer",
      event: "job.queued",
      message: "Job processed successfully",
      jobId: job.id,
      mediaPath: event.media_path,
      agentId: event.agent_id,
    });

    return true;
  } catch (error: any) {
    logger.error({
      timestamp: new Date().toISOString(),
      service: "service-processor-consumer",
      event: "job.failed",
      message: "Job failed during processing",
      error: error.message,
      stack: error.stack
    });

    return false;
  }
}
