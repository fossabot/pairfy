import {
  getMediaGroupId,
  sellerRequired,
  getFileId,
  ApiError,
  ERROR_CODES,
  SellerToken,
} from "@pairfy/common";
import database from "../database/index.js";
import { minioClient } from "../minioClient.js";
import { Request, Response, RequestHandler } from "express";
import validatedUpload from "../utils/multer.js";

const createFileMiddlewares: RequestHandler[] = [
  sellerRequired,
  validatedUpload,
];

const createFileHandler = async (req: Request, res: Response) => {
  let connection: any = null;
  const response: string[] = [];

  try {
    const SELLER = req.sellerData as SellerToken;
    const files = req.files as Express.Multer.File[];

    if (!files?.length) {
      throw new ApiError(400, "No valid files uploaded", {
        code: ERROR_CODES.VALIDATION_ERROR,
      });
    }

    connection = await database.client.getConnection();
    await connection.beginTransaction();

    const mediaGroupId = getMediaGroupId();
    const createdAt = Date.now();

    for (const file of files) {
      const fileId = getFileId();
      const mediaPath = `groups/${mediaGroupId}/${fileId}-${file.originalname}`;

      await minioClient.putObject(
        "media",
        mediaPath,
        file.buffer,
        file.size,
        { "Content-Type": file.mimetype } // ya validado antes
      );

      await connection.execute(
        `
        INSERT INTO files (
          id,
          media_group_id,
          agent_id,
          mime_type,
          filename,
          media_path,
          status,
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          fileId,
          mediaGroupId,
          SELLER.id,
          file.mimetype,
          file.originalname,
          mediaPath,
          "pending",
          createdAt,
        ]
      );

      response.push(fileId);
    }

    await connection.commit();

    res.status(200).send({
      success: true,
      data: {
        media_group_id: mediaGroupId,
        file_ids: response,
      },
    });
  } catch (err: any) {
    if (connection) await connection.rollback();
    throw err;
  } finally {
    if (connection) connection.release();
  }
};

export { createFileMiddlewares, createFileHandler };
