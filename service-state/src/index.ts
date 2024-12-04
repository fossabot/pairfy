import { catcher, logger, sleep } from "./utils/index.js";
import { Queue, QueueEvents, Worker, WorkerOptions } from "bullmq";
import { redisClient } from "./db/redis.js";
import { getAssetPrice } from "./bullmq/assets.js";

const main = async () => {
  try {
    if (!process.env.POD_TIMEOUT) {
      throw new Error("POD_TIMEOUT error");
    }

    if (!process.env.DATABASE_HOST) {
      throw new Error("DATABASE_HOST error");
    }

    if (!process.env.DATABASE_PORT) {
      throw new Error("DATABASE_PORT error");
    }

    if (!process.env.DATABASE_USER) {
      throw new Error("DATABASE_USER error");
    }

    if (!process.env.DATABASE_PASSWORD) {
      throw new Error("DATABASE_PASSWORD error");
    }

    if (!process.env.DATABASE_NAME) {
      throw new Error("DATABASE_NAME error");
    }

    if (!process.env.REDIS_HOST) {
      throw new Error("REDIS_HOST error");
    }

    const errorEvents: string[] = [
      "exit",
      "SIGINT",
      "SIGTERM",
      "SIGQUIT",
      "uncaughtException",
      "unhandledRejection",
      "SIGHUP",
      "SIGCONT",
    ];

    /*
    database.connect({
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
*/

    await redisClient
      .connect({
        url: process.env.REDIS_HOST,
        connectTimeout: 100000,
        keepAlive: 100000,
      })
      .then(() => console.log("redisClient connected"))
      .catch((err: any) => catcher(err));

    /////////////////////////////////////////

    const watchAssetPriceQueue = new Queue("getAssetPrice", {
      connection: { url: process.env.REDIS_HOST },
    });

    /////////////////////////////////////////////////////
    /* 
    const globalEvents = new QueueEvents("watchAssetPrice", {
      connection: { url: process.env.REDIS_HOST },
    });

    globalEvents.on("completed", ({ jobId }: { jobId: string }) => {
      console.log("completed", jobId);
    });

    globalEvents.on(
      "progress",
      ({ jobId, data }: { jobId: string; data: number | object }) => {
        console.log("completed", jobId);
      }
    );
*/
    /////////////////////////////////////////////////////
    (async () => {
      await watchAssetPriceQueue.add(
        "ADAUSDT",
        {
          symbol: "ADAUSDT",
        },
        {
          repeat: {
            every: 30000,
          },
          attempts: 99999,
          backoff: {
            type: "fixed",
            delay: 1000,
          },
          removeOnComplete: false,
          removeOnFail: false,
          jobId: "ADAUSDT",
        }
      );

      logger.info("getAssetPrice added.");
    })();

    const watchAssetPrice = new Worker("getAssetPrice", getAssetPrice, {
      removeOnComplete: false,
      removeOnFail: false,
      autorun: true,
      connection: { url: process.env.REDIS_HOST },
    } as any);

    ////////////////////////////////////////////////////////

    watchAssetPrice.on("failed", (job: any, err) => {
      logger.error(job.id, err);
    });

    watchAssetPrice.on("completed", (job: any, result) => {
      logger.info(job.id + result);
    });

    watchAssetPrice.on("error", (err) => {
      logger.error(err);
    });

    watchAssetPrice.on("stalled", (job: any) => {
      console.warn(`Job ${job.id} stalled.`);
    });

    watchAssetPrice.on("drained", () => {
      console.log("Queue is drained.");
    });

    errorEvents.forEach((e: string) =>
      process.on(e, async (err) => {
        logger.error(err);
        await watchAssetPrice.close();
        await redisClient.client.disconnect();
        process.exit(1);
      })
    );

    logger.info("ONLINE");
  } catch (err) {
    catcher(err);
  }
};

main();
