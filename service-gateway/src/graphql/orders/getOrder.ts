import { database } from "../../db/client.js";
import { SellerToken, UserToken } from "../../middleware/agent.js";

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

  export { getOrder }