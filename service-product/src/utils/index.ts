import {logger} from "@pairfy/common";
import { ISO31661Alpha2Countries } from "./countries";

export const catchError = (error?: any) => {
  logger.error(`EXIT=>${error}`);

  return process.exit(1);
};

/** ISO 3166-1 alpha-2. */
export const ISOCountries = ISO31661Alpha2Countries.map((country: any) => country.code);
