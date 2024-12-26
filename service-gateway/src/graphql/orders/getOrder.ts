import { decryptMetadata } from "../../blockchain/metadata.js";
import { SellerToken, UserToken } from "../../middleware/agent.js";
import { database } from "../../db/client.js";

const getOrder = async (_: any, args: any, context: any) => {
  const USER = (context.userData as UserToken) || null;

  const SELLER = (context.sellerData as SellerToken) || null;

  const params = args.getOrderInput;

  let connection = null;

  try {
    connection = await database.client.getConnection();

    if (USER) {
      const [row] = await connection.execute(
        "SELECT * FROM orders WHERE id = ? AND buyer_pubkeyhash = ?",
        [params.id, USER.pubkeyhash]
      );

      const { id, buyer_pubkeyhash, seller_id, shipping_metadata } = row[0];

      const shippingMetadata = await decryptMetadata(shipping_metadata);

      return {
        order: row[0],
        shipping: shippingMetadata,
        address: null,
        session: `${id}:${buyer_pubkeyhash}:${seller_id}`,
      };
    }

    if (SELLER) {
      const [row] = await connection.execute(
        "SELECT * FROM orders WHERE id = ? AND seller_id = ?",
        [params.id, SELLER.id]
      );

      const { id, buyer_pubkeyhash, seller_id, shipping_metadata } = row[0];

      const shippingMetadata = await decryptMetadata(shipping_metadata);

      return {
        order: row[0],
        shipping: shippingMetadata,
        address: null,
        session: `${id}:${buyer_pubkeyhash}:${seller_id}`,
      };
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

export { getOrder };
