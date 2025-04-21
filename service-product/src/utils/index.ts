import {createId, logger} from "@pairfy/common";

export const catchError = (error?: any) => {
  logger.error(`EXIT=>${error}`);

  return process.exit(1);
};


export const getProductId = () =>{
  return createId("0123456789ABCDEF", 25)
}