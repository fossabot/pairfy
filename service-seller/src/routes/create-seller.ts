import database from "../database";
import {
  validateRegistration,
  RegistrationInput,
} from "../validators/create-seller";
import { hashPassword } from "../utils/password";
import { Request, Response } from "express";
import { getSellerId } from "../utils/nano";
import { createToken } from "../utils/token";
import { createEvent, createSeller } from "@pairfy/common";
import { ApiError, ERROR_CODES } from "../common/errorHandler";
import { getSellerByEmail } from "./getSellerByEmail";
import { getSellerByUsername } from "./getSellerByUsername";
import { _ } from "../utils/pino";

const createSellerMiddlewares: any = [validateRegistration];

const createSellerHandler = async (req: Request, res: Response) => {
  let connection = null;

  const params = req.body as RegistrationInput;

  console.log(params);

  try {
    connection = await database.client.getConnection();

    const isEmailDuplicated = await getSellerByEmail(connection, params.email);

    if (isEmailDuplicated) {
      throw new ApiError(400, "Invalid email or username", {
        code: ERROR_CODES.BAD_REQUEST,
      });
    }

    const isUsernameDuplicated = await getSellerByUsername(
      connection,
      params.username
    );

    if (isUsernameDuplicated) {
      throw new ApiError(
        400,
        `The username ${params.username} is already in use.`,
        {
          code: ERROR_CODES.BAD_REQUEST,
        }
      );
    }
    ///////////////////////////////////////////////////////////////////////////////////

    await connection.beginTransaction();

    const timestamp = Date.now();

    const password = await hashPassword(params.password);

    const sellerId = getSellerId();

    const token = createToken(
      {
        source: "service-seller",
        entity: "SELLER",
        email: params.email,
        username: params.username,
      },
      "1h"
    );

    const emailScheme = {
      type: "register:seller",
      username: params.username,
      email: params.email,
      token: token,
    };

    const productScheme = {
      id: sellerId,
      username: params.username,
      email: params.email,
      password_hash: password,
      verified: false,
      country: params.country,
      terms_accepted: params.terms_accepted,
      avatar_base: "https://example.com",
      avatar_path: "/avatar.jpg",
      public_ip: req.publicAddress,
      created_at: timestamp,
      updated_at: timestamp,
      schema_v: 0,
    };

    console.log(productScheme);

    await createSeller(connection, productScheme).catch((err: any) => {
      throw new ApiError(500, "Internal error, please try again later.", {
        code: ERROR_CODES.INTERNAL_ERROR,
      });
    });

    await createEvent(
      connection,
      timestamp,
      "service-seller",
      "CreateSeller",
      JSON.stringify(productScheme),
      sellerId
    );

    await createEvent(
      connection,
      timestamp,
      "service-seller",
      "CreateEmail",
      JSON.stringify(emailScheme),
      sellerId
    );

    await connection.commit();

    ///////////////////////////////////////////////////////////////////////////////////

    res.status(200).send({
      success: true,
      data: {
        message: 'Please check your email in the "all" or "spam" folder.',
      },
    });
  } catch (err) {
    _.error(err);

    if (connection) {
      await connection.rollback();
    }

    throw err;
    
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export { createSellerMiddlewares, createSellerHandler };
