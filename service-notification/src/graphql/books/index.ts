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


  const getBooks = async (_: any, args: any, context: any) => {
    const params = args.getBooksInput;
  
    const SELLER = context.sellerData;
  
    const pageSize = 16;
  
    const defaultCursor = "NOT";
  
    let connection = null;
  
    let queryScheme = `
      SELECT
        p.id AS id,
        p.name AS name,
        p.price AS price,
        p.collateral AS collateral,
        p.sku AS sku,
        p.media_url AS media_url,
        p.image_path  AS image_path,
        p.image_set  AS image_set,
        p.discount AS discount,
        p.discount_value AS discount_value,
        p.created_at AS created_at,      
        b.keeping_stock AS book_keeping_stock,
        b.ready_stock AS book_ready_stock,
        b.blocked_stock AS book_blocked_stock,
        b.disable_purchases AS disable_purchases
      FROM
        products p
      INNER JOIN
        books b
      ON
        p.id = b.id    
      WHERE
        p.seller_id = ?`;
  
    let queryParams: any = [SELLER.id];
  
    if (params.cursor !== defaultCursor) {
      queryScheme += " AND p.created_at < ?";
  
      const date = new Date(parseInt(params.cursor)).toISOString();
  
      queryParams.push(date);
    }
  
    queryScheme += " ORDER BY p.created_at DESC LIMIT ?";
  
    queryParams.push(pageSize);
  
    try {
      connection = await database.client.getConnection();
  
      const [books] = await connection.query(queryScheme, queryParams);
  
      const [productCount] = await connection.execute(
        "SELECT COUNT(*) AS total_books FROM books WHERE seller_id = ?",
        [SELLER.id]
      );
  
      const cursor = books.length
        ? books[books.length - 1].created_at
        : params.cursor;
  
      const count = productCount[0].total_books;
  
      return {
        books,
        cursor,
        count,
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

  
  export{ getBooks, updateBook }