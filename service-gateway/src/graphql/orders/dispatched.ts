import { shippingTransactionBuilder } from "../../contracts/builders/shipping.js";
import { chunkMetadata, encryptMetadata } from "../../blockchain/metadata.js";
import { SellerToken } from "../../middleware/agent.js";
import { database } from "../../database/client.js";

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
    const PGPVersion = "1.0";

    const shippingData = {
      order_id: params.order_id,
      guide: params.guide,
      date: params.date,
      website: params.website,
      notes: params.notes,
      version: PGPVersion,
    };

    const encrypted = await encryptMetadata(
      JSON.stringify(shippingData),
      PGPVersion
    );

    const metadata = {
      version: PGPVersion,
      msg: chunkMetadata(encrypted, 64),
    };

    //////////////////////////////////////////////

    const deliveryDate = BigInt(params.date) + BigInt(process.env.DELIVERY_RANGE as string);

    const BUILDER = await shippingTransactionBuilder(
      SELLER.address,
      ORDER.contract_params,
      metadata,
      deliveryDate
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
