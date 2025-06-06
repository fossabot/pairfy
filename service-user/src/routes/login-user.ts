import database from "../database";
import Cardano from "@emurgo/cardano-serialization-lib-nodejs";
import { loginUserMiddleware } from "../validators/login-user";
import { UserToken, userMiddleware } from "../utils/user";
import { getPubKeyHash } from "../utils/crypto";
import { createToken } from "../utils/token";
import { BadRequestError } from "../errors";
import { Request, Response } from "express";
import { getUsername } from "../utils/nano";
import { logger } from "../utils";

const verifyDataSignature = require("@cardano-foundation/cardano-verify-datasignature");

const loginUserMiddlewares: any = [userMiddleware, loginUserMiddleware];

const loginUserHandler = async (req: Request, res: Response) => {
  let connection = null;

  try {
    let params = req.body;

    console.log(params);

    console.log(req.publicAddress, req.ip);

    const address = Cardano.Address.from_hex(params.address);

    const address32: string = address.to_bech32();

    const pubkeyhash = getPubKeyHash(address);

    const signature = params.signature;

    const message = "PLEASE SIGN TO AUTHENTICATE YOUR PUBLIC SIGNATURE";

    const verifySignature = verifyDataSignature(
      signature.signature,
      signature.key,
      message,
      address32
    );

    if (!verifySignature) {
      throw new BadRequestError("CredentialError");
    }

    connection = await database.client.getConnection();

    await connection.beginTransaction();

    const username = getUsername();

    const schemeData = `
    INSERT INTO users (
      pubkeyhash,
      username,
      address,
      country,
      terms_accepted,
      public_ip,
      schema_v
     ) 
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
      pubkeyhash = pubkeyhash,
      username = username,
      address = address,
      country = country,
      terms_accepted = terms_accepted,
      public_ip = VALUES(public_ip),
      schema_v = schema_v;
     `;

    const schemeValue = [
      pubkeyhash,
      username,
      address32,
      params.country,
      params.terms_accepted,
      req.publicAddress,
      0,
    ];

    await connection.execute(schemeData, schemeValue);

    ///////////////////////////////////////////////////////////////////

    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE pubkeyhash = ?",
      [pubkeyhash]
    );

    const USER = rows[0];

    const tokenData: UserToken = {
      pubkeyhash: USER.pubkeyhash,
      role: "USER",
      address: USER.address,
      country: USER.country,
      username: USER.username,
    };

    console.log(schemeValue);

    const token = createToken(tokenData);

    req.session = {
      jwt: token,
    };

    await connection.commit();

    const userData = {
      ...tokenData,
      token,
    };

    res.status(200).send({ success: true, data: userData });
  } catch (err) {
    logger.error(err);

    if (connection) {
      await connection.rollback();
    }
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export { loginUserMiddlewares, loginUserHandler };
