import { customAlphabet } from "nanoid";
import { Logger } from "tslog";

const logger = new Logger({
  name: "POD",
  prettyLogTemplate: "{{logLevelName}} {{dateIsoStr}} {{fileNameWithLine}}",
  type: "pretty",
});

const catchError = async (error?: any) => {
  logger.error(`EXIT=>${error}`);

  process.exit(0);
};

const generateId = customAlphabet("0123456789ABCDEFGHIKLMNOPQRSTUVWXYZ", 15);

async function disableConnections(database: any, natsClient: any) {
  database.client.pool.config.connectionLimit = 0;

  try {
    await natsClient.drain();
    await natsClient.close();
    await database.client.end();
  } catch (err) {
    console.log(err);
  }

  setTimeout(() => {
    process.exit(1);
  }, 30_000);
}

export { logger, catchError, generateId, disableConnections };
