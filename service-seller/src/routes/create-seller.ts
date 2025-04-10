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
import { createEvent } from "@pairfy/common";

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

    const schemeData = `
    INSERT INTO sellers (
      id,
      username,
      email,
      password_hash,
      verified,
      country,
      terms_accepted,
      avatar_base,
      avatar_path,
      public_ip,
      schema_v
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const schemeValue = [
      sellerId,
      username,
      params.email,
      password,
      true,
      params.country,
      params.terms_accepted,
      "https://example.com",
      "/avatar.jpg",
      req.publicAddress,
      0,
    ];

    console.log(schemeValue);

    await connection.execute(schemeData, schemeValue);

    const token = createToken({
      source: "createSeller",
      entity: "SELLER",
      email: params.email,
      username,
    });

    const eventPayload = {
      email: params.email,
      token,
    };

    await createEvent(
      connection,
      "service-seller",
      "CreateSeller",
      JSON.stringify(eventPayload),
      sellerId
    );

    await connection.commit();

    res.status(200).send({ success: true, message: "Successfully registered" });
  } catch (err) {
    if (connection) {
      await connection.rollback();
    }

    _.error(err);

    throw new BadRequestError("Invalid username or email");
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export { createSellerMiddlewares, createSellerHandler };
