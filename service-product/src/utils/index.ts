import { logger, ISO31661Alpha2Countries, categories } from "@pairfy/common";

export const catchError = (error?: any) => {
  logger.error(`EXIT=>${error}`);

  return process.exit(1);
};

/** ISO 3166-1 alpha-2. */
export const ISOCountries = ISO31661Alpha2Countries.map(
  (country: any) => country.code
);

export const categoryCodes = Object.values(categories).map(
  (item: any) => item.code
);
