import { returnTransactionBuilder } from "../../contracts/builders/return.js";
import { UserToken } from "../../middleware/agent.js";
import { database } from "../../db/client.js";

const TX_VALID_TIME = parseInt(process.env.TX_VALID_TIME as string);

const returnFunds = async (_: any, args: any, context: any) => {
  if (!context.userData) {
    throw new Error("CREDENTIALS");
  }
  const params = args.returnFundsInput;

  console.log(params);

  const USER = context.userData as UserToken;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    const [row] = await connection.execute(
      `SELECT
             id,
             contract_params
       FROM orders          
       WHERE id = ? AND buyer_pubkeyhash = ?`,
      [params.order_id, USER.pubkeyhash]
    );

    if (!row.length) {
      throw new Error("NO_ORDER");
    }

    const ORDER = row[0];

    ///////////////////////////////////////////////////

    const now = Date.now();

    const validUntil = now + TX_VALID_TIME * 60 * 1000;

    //////////////////////////////////////////////

    const BUILDER = await returnTransactionBuilder(
      USER.address,
      ORDER.contract_params,
      BigInt(validUntil)
    );

    return {
      success: true,
      payload: {
        cbor: BUILDER.cbor
      },
    };
  } catch (err: any) {
    if (connection) {
      await connection.rollback();
    }

    throw new Error(err.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};



export { returnFunds };
