import { getContractCollateral, getContractPrice } from "../../lib/index.js";
import { pendingTransactionBuilder } from "../../contracts/builders/pending.js";
import { redisClient } from "../../db/redis.js";
import { SellerToken, UserToken } from "../../middleware/agent.js";
import { database } from "../../db/client.js";

const createOrder = async (_: any, args: any, context: any) => {
  if (!context.userData) {
    throw new Error("CREDENTIALS");
  }

  const params = args.createOrderInput;

  console.log(params);

  const productUnits = params.product_units;

  if (productUnits <= 0) {
    throw new Error("UNITS_ERROR");
  }

  const USER = context.userData as UserToken;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    const [row] = await connection.execute(
      `SELECT
             p.id AS product_id,
             p.name AS product_name,
             p.price AS product_price,
             p.model AS product_model,
             p.sku AS product_sku,
             p.brand AS product_brand,
             p.bullet_list AS product_bullet_list,
             p.collateral AS product_collateral,
             p.discount AS product_discount,
             p.discount_value AS product_discount_value,
             s.id AS seller_id,
             s.pubkeyhash AS seller_pubkeyhash
         FROM
             products p
         INNER JOIN
             sellers s
         ON
             p.seller_id = s.id            
         WHERE
             p.id = ?`,
      [params.product_id]
    );

    if (!row.length) {
      throw new Error("NO_PRODUCT");
    }
    const RESULT = row[0];

    if (!RESULT.seller_pubkeyhash) {
      throw new Error("NO_SELLER_PKH");
    }

    await connection.beginTransaction();

    ///////////////////////////////////////////////////

    const getADAPrice = await redisClient.client.get("price:ADAUSDT");

    if (!getADAPrice) {
      throw new Error("ADA_PRICE");
    }

    const adaPrice = parseFloat(getADAPrice);

    ///////////////////////////////////////////////////

    const contractPrice: number = await getContractPrice(
      RESULT.product_discount,
      RESULT.product_discount_value,
      RESULT.product_price,
      productUnits,
      adaPrice
    );

    const contractCollateral: number = await getContractCollateral(
      RESULT.product_collateral,
      productUnits,
      adaPrice
    );

    const now = Date.now();

    ///////////////////////////////////////////////

    const TX_VALID_TIME = 5; //tx valid until

    const WATCH_TX_WINDOW = 15; //Observation window limit for the detection of the first transaction

    const PENDING_UNTIL = 60; // 15minutes for the seller to accept;

    const SHIPPING_UNTIL = 1440; // 24h to shipping;

    ///////////////////////////////////////////////
    const validUntil = now + TX_VALID_TIME * 60 * 1000;

    const watchUntil = now + (TX_VALID_TIME + WATCH_TX_WINDOW * 60 * 1000);

    const pendingUntil =
      now + (TX_VALID_TIME + WATCH_TX_WINDOW + PENDING_UNTIL * 60 * 1000);

    const shippingUntil =
      now +
      (TX_VALID_TIME +
        WATCH_TX_WINDOW +
        PENDING_UNTIL +
        SHIPPING_UNTIL * 60 * 1000);

    //////////////////////////////////////////////

    const BUILDER = await pendingTransactionBuilder(
      USER.address,
      RESULT.seller_pubkeyhash,
      BigInt(contractPrice),
      BigInt(contractCollateral),
      BigInt(validUntil),
      BigInt(pendingUntil),
      BigInt(shippingUntil)
    );

    //////////////////////////////////////////////

    const orderData = {
      id: BUILDER.threadTokenPolicyId,
      seller_id: RESULT.seller_id,
      buyer_pubkeyhash: USER.pubkeyhash,
      seller_pubkeyhash: RESULT.seller_pubkeyhash,
      ada_price: adaPrice, // add to metadata contract
      contract_address: BUILDER.stateMachineAddress,
      contract_price: contractPrice,
      contract_collateral: contractCollateral,
      contract_units: productUnits, // add to metadata contract
      product_id: RESULT.product_id, // add to metadata contract
      product_sku: RESULT.product_sku, // add to metadata contract
      product_price: RESULT.product_price, // add to metadata contract
      product_collateral: RESULT.product_collateral, // add to metadata contract
      product_discount: RESULT.product_discount, // add to metadata contract
      product_discount_value: RESULT.product_discount_value, // add to metadata contract
      watch_until: watchUntil,
      pending_until: pendingUntil,
    };

    console.log(orderData);

    const columns = Object.keys(orderData);

    const values = Object.values(orderData);

    const schemeData = `
        INSERT INTO orders (${columns.join(", ")})
        VALUES (${columns.map(() => "?").join(", ")})
      `;

    await connection.execute(schemeData, values);

    await connection.commit();

    const scheme = {
      success: true,
      payload: {
        cbor: BUILDER.cbor,
        order: BUILDER.threadTokenPolicyId
      },
    };

    return scheme;
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

const getOrder = async (_: any, args: any, context: any) => {

  const USER = (context.userData as UserToken) || null;

  const SELLER = (context.sellerData as SellerToken) || null;

  const params = args.getOrderInput;

  console.log(params);


  let connection = null;

  try {
    connection = await database.client.getConnection();

    if (USER) {
      const [row] = await connection.execute(
        "SELECT * FROM orders WHERE id = ? AND buyer_pubkeyhash = ?",
        [params.id, USER.pubkeyhash]
      );

      return row[0];
    }

    if (SELLER) {
      const [row] = await connection.execute(
        "SELECT * FROM orders WHERE id = ? AND seller_id = ?",
        [params.id, SELLER.id]
      );

      return row[0];
    }
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

export { createOrder, getOrder };
