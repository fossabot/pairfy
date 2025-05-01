import {
  getMediaGroupId,
  sellerRequired,
  getFileId,
  ApiError,
  ERROR_CODES,
  SellerToken,
} from "@pairfy/common";
import database from "../database/index.js";
import uploadMiddleware from "../utils/multer.js";
import { Request, Response } from "express";

const createImageMiddlewares: any = [
  sellerRequired,
  uploadMiddleware.array("image", 15),
];

const createImageHandler = async (req: Request, res: Response) => {
  let connection: any = null;

  let response: string[] = [];

  try {
    const SELLER = req.sellerData as SellerToken
    ;

    if (!req.files) {
      throw new ApiError(400, "No files were uploaded", {
        code: ERROR_CODES.VALIDATION_ERROR
      });
    }

    connection = await database.client.getConnection();

    await connection.beginTransaction();

    ////////////////////////////////////////////////////////////////////////////////////////

    for (const file of req.files as Express.Multer.File[]) {
      const schemeData = `
      INSERT INTO files (
        id,
        group_id,
        agent_id,
        mime_type,
        filename,
        media_path,
        status,
        created_at
       ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

      const fileId = getFileId();

      const mediaGroupId = getMediaGroupId();

      const mediaName = fileId + "." + file.mimetype.split("/")[1];

      const schemeValue = [
        fileId,
        mediaGroupId,
        SELLER.id,
        "image",
        file.mimetype,
        file.buffer,
        Date.now()
      ];

      const [result] = await connection.execute(schemeData, schemeValue);

      if (result.affectedRows === 1) {
        response.push(mediaName);
      }
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    await connection.commit();

    res.status(200).send({ success: true, data: { images: response } });
  } catch (err: any) {
    if (connection) {
      await connection.rollback();
    }

    throw err;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export { createImageMiddlewares, createImageHandler };
