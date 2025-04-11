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

function sleep(seconds: number): Promise<void> {
  if (typeof seconds !== "number" || seconds < 0) {
    throw new Error("sleep() requires a non-negative number of seconds");
  }
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function checkHandlerVariables() {
  const handlerVars = Object.keys(process.env).filter((key) =>
    key.startsWith("HANDLER_")
  );

  if (handlerVars.length === 0) {
    logger.info("[WARNING]: No HANDLER_ environment variables found");
  }
  
  return handlerVars;
}

export {
  logger,
  catchError,
  generateId,
  disableConnections,
  sleep,
  checkHandlerVariables,
};
