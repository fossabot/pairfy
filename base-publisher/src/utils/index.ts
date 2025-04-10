import { Logger } from "tslog";
import { customAlphabet } from "nanoid";

const logger = new Logger({
  name: "POD",
  prettyLogTemplate: "{{logLevelName}} {{dateIsoStr}} {{fileNameWithLine}}",
  type: "pretty",
});

const catchError = async (error: any) => {
  logger.error(`ERROR=>${error}`);

  await sleep(100_000);

  process.exit(1);
};

const generateId = customAlphabet("0123456789ABCDEFGHIKLMNOPQRSTUVWXYZ", 15);

const sleep = (timeInMs: number) =>
  new Promise((resolve) => setTimeout(() => resolve(false), timeInMs));

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

export { logger, catchError, generateId, sleep, errorEvents };
