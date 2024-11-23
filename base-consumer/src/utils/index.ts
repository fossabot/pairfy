import { Logger } from "tslog";
import { customAlphabet } from "nanoid";
import { database } from "../db/client.js";

const logger = new Logger({
  name: "service-product",
  prettyLogTemplate: "{{logLevelName}} {{dateIsoStr}} {{fileNameWithLine}}",
  type: "pretty",
});

const catcher = async (message?: any, error?: any, bypass?: boolean) => {
  try {
    await database.client.end();
    logger.info("DB CLOSED");
  } catch (error: any) {
    logger.error("DB_END_ERROR:", error);
  }

  logger.error(`EXIT=>${message}-${error}`);

  return bypass || process.exit(1);
};

const generateId = customAlphabet("0123456789ABCDEFGHIKLMNOPQRSTUVWXYZ", 15);

export { logger, catcher, generateId };
