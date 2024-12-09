import { redisClient } from "../db/redis.js";
import { axiosAPI } from "../axios/index.js";
import { logger } from "../utils/index.js";

async function scanThreadToken(job: any) {
  try {
    let threadtoken = job.data.threadtoken;

    console.log(threadtoken);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export { scanThreadToken };
