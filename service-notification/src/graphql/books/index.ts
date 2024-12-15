import { database } from "../../db/client.js";

const updateBook = async (_: any, args: any, context: any) => {
    const params = args.updateBookInput;
  
    console.log(params);
  
    const SELLER = context.sellerData;
  
    let connection = null;
  
    try {
      connection = await database.client.getConnection();
  
      await connection.beginTransaction();
  
      const schemeData = `
          UPDATE books
          SET keeping_stock = ?,
              ready_stock = ?,
              disable_purchases = ?,              
              schema_v = schema_v + 1
          WHERE id = ? AND seller_id = ?
         `;
  
      const schemeValue = [
        params.keeping_stock,
        params.ready_stock,
        params.disable_purchases,
        params.id,
        SELLER.id,
      ];
  
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


  export{ updateBook }