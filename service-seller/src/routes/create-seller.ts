import DB from "../database";
import {
  validateRegistration,
  RegistrationInput,
} from "../validators/create-seller";
import { hashPassword } from "../utils/password";
import { BadRequestError } from "../errors";
import { Request, Response } from "express";
import { getSellerId } from "../utils/nano";
import { createToken } from "../utils/token";
import { getUsername } from "../utils/names";
import { _ } from "../utils/pino";
import { createEvent, createSeller } from "@pairfy/common";

const createSellerMiddlewares: any = [validateRegistration];

const createSellerHandler = async (req: Request, res: Response) => {
  let connection = null;

  const params = req.body as RegistrationInput;

  console.log(params);

  try {
    connection = await DB.client.getConnection();

    await connection.beginTransaction();

    const username = getUsername();

    const password = await hashPassword(params.password);

    const sellerId = getSellerId();

    const timestamp = Date.now();

    const token = createToken(
      {
        source: "service-seller",
        entity: "SELLER",
        email: params.email,
        username: username,
      },
      "1h"
    );

    const emailScheme = {
      email: params.email,
      token: token,
    };

    const productScheme = {
      id: sellerId,
      username: username,
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
      "CreateSellerEmail",
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

    throw new BadRequestError("Invalid username or email");
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export { createSellerMiddlewares, createSellerHandler };
