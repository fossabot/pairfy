import { redisClient } from "./database/redis.js";
import { searchIndex } from "./elastic/index.js";
import {
  handleError,
  errorEvents,
  logger,
  redisChecker,
  sleep,
} from "./utils/index.js";

const main = async () => {
  try {
    if (!process.env.POD_TIMEOUT) {
      throw new Error("POD_TIMEOUT error");
    }

    if (!process.env.REDIS_HOST) {
      throw new Error("REDIS_HOST error");
    }

    if (!process.env.ELASTIC_NODE) {
      throw new Error("ELASTIC_NODE error");
    }

    if (!process.env.ELASTIC_KEY) {
      throw new Error("ELASTIC_KEY error");
    }

    if (!process.env.INTERVAL_MS) {
      throw new Error("INTERVAL_MS error");
    }

    if (!process.env.BEST_SELLER) {
      throw new Error("BEST_SELLER error");
    }

    await redisClient
      .connect({
        url: process.env.REDIS_HOST,
        connectTimeout: 100000,
        keepAlive: 100000,
      })
      .then(() => redisChecker(redisClient))
      .catch((err: any) => handleError(err));

    errorEvents.forEach((e: string) =>
      process.on(e, async (err) => {
        logger.error(err);
        await redisClient.client.disconnect();
        process.exit(1);
      })
    );

    ///////////////////////////////////////////////////////////

    logger.info("ONLINE");

    while (true) {
      const search = await searchIndex("Office Supplies & Equipment", 18);

      if (search.length) {
        const data = search;

        console.log(data);
      }

      await sleep(Number(process.env.INTERVAL_MS as string));
    }
  } catch (err) {
    handleError(err);
  }
};

main();
