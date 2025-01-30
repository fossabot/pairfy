import { database } from "../../database/client.js";



export const deleteProduct = async (_: any, args: any, context: any) => {
    const params = args.deleteProductInput;
  
    console.log(params);
  
    const SELLER = context.sellerData;
  
    let connection = null;
  
    try {
      connection = await database.client.getConnection();
  
      await connection.beginTransaction();
  
      const schemeData = "DELETE FROM products WHERE id = ? AND seller_id = ?";
  
      const schemeValue = [params.id, SELLER.id];
  
      const [result] = await connection.execute(schemeData, schemeValue);
  
      if (result.affectedRows !== 1) {
        throw new Error("INTERNAL_ERROR");
      }
  
      await connection.commit();
  
      return { success: true };
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