import DB from "../database";
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
import { _ } from "../utils/pino";

const createSellerMiddlewares: any = [validateRegistration];

const createSellerHandler = async (req: Request, res: Response) => {
  let connection = null;

  const params = req.body as RegistrationInput;

  console.log(params);

  try {
    connection = await DB.client.getConnection();

    await connection.beginTransaction();

    const password = await hashPassword(params.password);

    const sellerId = getSellerId();

    const timestamp = Date.now();

    const token = createToken(
      {
        source: "service-seller",
        entity: "SELLER",
        email: params.email,
        username: params.username
      },
      "1h"
    );

    const emailScheme = {
      type: 'register:seller',
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

    await createSeller(connection, productScheme);

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

    res.status(200).send({ success: true, message: "Successfully registered" });
  } catch (err) {
    _.error(err);

    if (connection) {
      await connection.rollback();
    }

    throw new ApiError(401, "Invalid Credentials", { code: ERROR_CODES.INVALID_CREDENTIALS });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export { createSellerMiddlewares, createSellerHandler };
