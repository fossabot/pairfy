import { database } from "../../database/client.js";

export const updateProduct = async (_: any, args: any, context: any) => {
    const params = args.updateProductInput;
  
    console.log(params);
  
    const SELLER = context.sellerData;
  
    if (params.collateral >= params.price) {
      throw new Error("MAX_COLLATERAL");
    }
  
    let connection = null;
  
    try {
      connection = await database.client.getConnection();
  
      await connection.beginTransaction();
  
      const schemeData = `
          UPDATE products
          SET name = ?,
              price = ?,  
              collateral = ?,
              sku = ?,              
              model = ?,
              brand = ?,
              features = ?,
              category = ?,
              keywords = ?,
              bullet_list = ?,
              paused = ?,
              color = ?,
              color_name = ?,
              quality = ?,
              image_set = ?,
              video_set = ?,
              discount = ?,
              discount_value = ?,
              schema_v = schema_v + 1
          WHERE id = ? AND seller_id = ?
         `;
  
      const schemeValue = [
        params.name,
        params.price,
        params.collateral,
        params.sku,
        params.model,
        params.brand,
        params.features,
        params.category,
        params.keywords,
        params.bullet_list,
        params.paused,
        params.color,
        params.color_name,
        params.quality,
        params.image_set,
        params.video_set,
        params.discount,
        params.discount_value,
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