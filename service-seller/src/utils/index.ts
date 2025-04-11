import { _ } from "./pino";

const catchError = (error?: any) => {
  _.error(`EXIT=>${error}`);

  return process.exit(1);
};

export { catchError };
