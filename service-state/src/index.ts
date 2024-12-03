import { catcher, logger } from "./utils/index.js";
import { axiosAPI } from "./axios/index.js";
import { Queue, Worker, WorkerOptions } from "bullmq";

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

    errorEvents.forEach((e: string) => process.on(e, (err) => catcher(err)));

    /*
    database.connect({
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
*/

    const queue = new Queue("cardano-price", {
      connection: { url: process.env.REDIS_HOST },
    });

    queue.on("waiting", (job: any) => {
      console.log("waiting", job.id);
    });
    /*
    const globalEvents = new QueueEvents("cardano-price", {
      connection: redisClient.client,
    });

    /////////////////////////////////////////////////////
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
    
    //await queue.obliterate();

    const watchAssetPriceJob = await queue.add(
      "ADAUSDT",
      {},
      {
        repeat: {
          every: 50000,
        },
        attempts: 99,
        backoff: {
          type: "fixed",
          delay: 1000,
        },
        removeOnComplete: false,
        removeOnFail: false,
      }
    );

    //await watchAssetPriceJob.remove();

    type BinanceResponse = { mins: number; price: string; closeTime: number };

    const worker = new Worker(
      "cardano-price",
      async (job) => {
        try {
          console.log("QUERY", job.id);

          const response: any = await axiosAPI.get(
            "/api/v3/avgPrice?symbol=ADAUSDT"
          );

          console.log(response.status);

          if (response.status === 200) {
            const payload: BinanceResponse = response.data;

            const assetPrice = Number(parseFloat(payload.price).toFixed(2));

            console.log(assetPrice);
          } else {
            throw new Error("BINANCE_API_ERROR");
          }
        } catch (err) {
          logger.error(err);
          throw err;
        }
      },
      {
        autorun: true,
        // concurrency: 10,
        connection: { url: process.env.REDIS_HOST },
      } as WorkerOptions
    );

    worker.on("failed", (job: any, err) => {
      logger.error(job.id, err);
    });

    worker.on("completed", (job: any, result) => {
      logger.info(job.id + result);
    });

    worker.on("error", (err) => {
      logger.error(err);
    });

    worker.on("stalled", (job: any) => {
      console.warn(`Job ${job.id} stalled.`);
    });

    worker.on("drained", () => {
      console.log("Queue is drained.");
    });

    logger.info("ONLINE");
  } catch (err) {
    catcher(err);
  }
};

main();
