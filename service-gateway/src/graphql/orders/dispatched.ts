import { shippingTransactionBuilder } from "../../contracts/builders/shipping.js";
import { SellerToken } from "../../middleware/agent.js";
import { database } from "../../db/client.js";
import { decryptMetadata, encryptMetadata } from "../../blockchain/metadata.js";

const dispatchProduct = async (_: any, args: any, context: any) => {
  if (!context.sellerData) {
    throw new Error("CREDENTIALS");
  }

  const params = args.dispatchProductInput;

  console.log(params);

  const SELLER = context.sellerData as SellerToken;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    const [row] = await connection.execute(
      `SELECT
             id,
             finished,
             contract_params,
             contract_state
       FROM orders          
       WHERE id = ? AND seller_id = ?`,
      [params.order_id, SELLER.id]
    );

    if (!row.length) {
      throw new Error("NO_ORDER");
    }

    const ORDER = row[0];

    if (ORDER.finished) {
      throw new Error("ORDER_FINISHED");
    }

    if (ORDER.contract_state === 2) {
      throw new Error("ALREADY_DISPATCHED");
    }

    if (ORDER.contract_state !== 1) {
      throw new Error("STATE_DIFF_ONE");
    }

    //////////////////////////////////////////////
    const shippingData = {
      order_id: params.order_id,
      guide: params.guide,
      date: params.date,
      website: params.website,
      notes: params.notes,
      version: "1.0",
    };

    const encrypted = await encryptMetadata(JSON.stringify(shippingData));

    const metadata = {
      data: encrypted,
    };

    console.log(metadata);

    const BUILDER = await shippingTransactionBuilder(
      SELLER.address,
      ORDER.contract_params,
      metadata
    );

    return {
      success: true,
      payload: {
        cbor: BUILDER.cbor,
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

export { dispatchProduct };
