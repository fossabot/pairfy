import {
  catcher,
  errorEvents,
  logger,
  sleep,
  workOptions,
} from "./utils/index.js";
import { Queue, Worker } from "bullmq";
import { redisClient } from "./db/redis.js";
import { scanThreadToken } from "./handlers/assets.js";
import { database } from "./db/client.js";

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

    if (!process.env.PROJECT_ID) {
      throw new Error("PROJECT_ID error");
    }

    if (!process.env.QUERY_LIMIT) {
      throw new Error("QUERY_LIMIT error");
    }

    if (!process.env.QUERY_INTERVAL) {
      throw new Error("QUERY_INTERVAL error");
    }

    /////////////////////////////////////////

    await redisClient
      .connect({
        url: process.env.REDIS_HOST,
        connectTimeout: 100000,
        keepAlive: 100000,
      })
      .then(() => console.log("redisClient connected"))
      .catch((err: any) => catcher(err));

    const checkRedis = setInterval(async () => {
      try {
        await redisClient.client.ping();
        console.log("Redis Online");
      } catch (err) {
        logger.error("Redis Error", err);
      }
    }, 10_000);

    //////////////////////////////////////////

    database.connect({
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      waitForConnections: true,
      connectionLimit: 150,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 5000,
      connectTimeout: 30000,
      timezone: "Z",
      supportBigNumbers: true,
      bigNumberStrings: true,
    });

    /////////////////////////////////////////

    const mainQueue = new Queue("scanThreadToken", {
      connection: { url: process.env.REDIS_HOST },
    });

    const worker = new Worker("scanThreadToken", scanThreadToken, {
      removeOnComplete: false,
      removeOnFail: false,
      autorun: true,
      drainDelay: 1000,
      connection: { url: process.env.REDIS_HOST },
    } as any);

    worker.on("failed", (job: any, err) => {
      logger.error("FAILED", job.id, err);
    });

    worker.on("completed", (job: any, result) => {
      console.log("COMPLETED", job.id, result);
    });

    worker.on("error", (err) => {
      logger.error(err);
    });

    worker.on("stalled", (job: any) => {
      logger.error("STALLED", job.id);
    });

    worker.on("drained", () => {
      logger.error("DRAINED");
    });

    errorEvents.forEach((e: string) =>
      process.on(e, async (err) => {
        logger.error(err);
        await worker.close();
        await database.client.end();
        await redisClient.client.disconnect();
        clearInterval(checkRedis);
        process.exit(1);
      })
    );

    /////////////////////////////////////////////////

    let connection: any = null;

    while (true) {
      try {
        connection = await database.client.getConnection();

        const queryScheme = `
          SELECT id, finished, scanning
          FROM orders
          WHERE finished = ?
          AND scanning = ?
          ORDER BY created_at ASC
          LIMIT ? 
          FOR UPDATE SKIP LOCKED`;

        const [findOrders] = await connection.query(queryScheme, [
          false,
          false,
          parseInt(process.env.QUERY_LIMIT),
        ]);

        if (!findOrders.length) console.log("EmptyOrders");

        for (const order of findOrders) {
          try {
            await connection.beginTransaction();

            const [updateOrder] = await connection.execute(
              "UPDATE orders SET scanning = ? WHERE id = ?",
              [true, order.id]
            );

            if (updateOrder.affectedRows !== 1) {
              throw new Error("UPDATE_ORDER");
            }

            const createWork = await mainQueue.add(
              order.id,
              {
                threadtoken: order.id,
              },
              {
                ...workOptions,
                jobId: order.id,
              }
            );

            if (!createWork.name) {
              throw new Error("CREATE_WORK");
            }

            await connection.commit();
          } catch (err) {
            logger.error(err);
            continue;
          }
        }
      } catch (err: any) {
        logger.error(err);

        if (connection) {
          await connection.rollback();
        }
      } finally {
        if (connection) {
          connection.release();
        }
      }
      //SLEEP
      await sleep(parseInt(process.env.QUERY_INTERVAL));
    }
  } catch (err) {
    catcher(err);
  }
};

main();
