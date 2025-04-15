import database from "../database";
import {
  logger,
  verifyToken,
  findSellerByEmail,
  ApiError,
  ERROR_CODES,
} from "@pairfy/common";
import { Request, Response } from "express";
import { verifySellerValidator } from "../validators/verify-seller";
import { updateSeller } from "./updateSeller";

const verifySellerMiddlewares: any = [];

const verifySellerHandler = async (req: Request, res: Response) => {
  let connection = null;

  try {
    const { token } = verifySellerValidator.parse(req.body);

    const sellerToken = verifyToken(token, process.env.AGENT_JWT_KEY as string);

    connection = await database.client.getConnection();

    ///////////////////////////////////////////////////////////////////////////////////

    await connection.beginTransaction();

    if (sellerToken.entity === "SELLER") {
      const sellerData = await findSellerByEmail(connection, sellerToken.email);

      console.log(sellerData);

      await updateSeller(connection, sellerData.id, sellerData.schema_v, {
        verified: true,
      });
    }

    await connection.commit();

    ///////////////////////////////////////////////////////////////////////////////////

    res.status(200).send({
      success: true,
      data: {
        message: "Token verified successfully",
      },
    });
  } catch (err: any) {
    logger.error(err);

    if (connection) {
      await connection.rollback();
    }

    throw new ApiError(500, "Invalid Credentials", {
      code: ERROR_CODES.INVALID_CREDENTIALS,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
export { verifySellerMiddlewares, verifySellerHandler };
