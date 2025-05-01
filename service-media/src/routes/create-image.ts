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
import { fileTypeFromBuffer } from "file-type";
import { minioClient } from "../minioClient.js";
import { Request, Response } from "express";

const createFileMiddlewares: any = [
  sellerRequired,
  uploadMiddleware.array("image", 15),
];

const createFileHandler = async (req: Request, res: Response) => {
  let connection: any = null;
  const response: string[] = [];

  try {
    const SELLER = req.sellerData as SellerToken;

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      throw new ApiError(400, "No files were uploaded", {
        code: ERROR_CODES.VALIDATION_ERROR,
      });
    }

    connection = await database.client.getConnection();
    await connection.beginTransaction();

    const mediaGroupId = getMediaGroupId();
    const createdAt = Date.now();

    for (const file of req.files as Express.Multer.File[]) {
      const fileType = await fileTypeFromBuffer(file.buffer);
      if (!fileType) {
        throw new ApiError(400, "Invalid file format", {
          code: ERROR_CODES.VALIDATION_ERROR,
        });
      }

      const fileId = getFileId();
      const sanitizedName = file.originalname
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9.\-_]/g, "");
      const mediaPath = `groups/${mediaGroupId}/${fileId}-${sanitizedName}`;

      // Subida a MinIO
      await minioClient.putObject(
        "media", // bucket
        mediaPath,
        file.buffer,
        file.size,
        { "Content-Type": fileType.mime }
      );

      // Inserción en base de datos
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
          fileType.mime,
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
