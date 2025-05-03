import { logger } from "@pairfy/common";

export const errorEvents: string[] = [
  "exit",
  "SIGINT",
  "SIGTERM",
  "SIGQUIT",
  "uncaughtException",
  "unhandledRejection",
];

export const catchError = (error?: any) => {
  logger.error(`EXIT=>${error}`);

  return process.exit(1);
};
