import database from "../database/index.js";
import { Request, Response } from "express";

const getImageMiddlewares: any = [];

const getImageHandler = async (req: Request, res: Response) => {
  let connection: any = null;

  let response: string[] = [];
  
  try {

    connection = await database.client.getConnection();

    const mediaId = req.params.mediaId.split('.')[0];


    const [rows] = await connection.execute(
      "SELECT * FROM media WHERE media_id = ?",
      [mediaId]
    );

    const imageData = rows[0];

    res.writeHead(200, { "Content-Type": imageData.media_mimetype });

    res.end(imageData.media_data);

    await connection.commit();
  } catch (err) {
    await connection.rollback();

  } finally {
    connection.release();
  }
};

export { getImageMiddlewares, getImageHandler };
