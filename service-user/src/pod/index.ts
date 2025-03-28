import { logger } from "../utils";

const catchError = (message?: any, error?: any, bypass?: boolean) => {
  logger.error(`catchError:${message}-${error}`);

  return bypass || process.exit(1);
};

export { catchError};
