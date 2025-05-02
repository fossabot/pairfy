import { Request, Response, NextFunction } from "express";
import { ApiError, ERROR_CODES } from "@pairfy/common";
import { minioClient } from "../common/minioClient.js";
import { verifyParams } from "../validators/get-file.js";
import database from "../database/index.js";

const allowedMimes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

export const getFileMiddlewares: any = [];

export const getFileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let connection: any = null;

  try {
    const validateParams = verifyParams.safeParse(req.params);

    if (!validateParams.success) {
      throw new ApiError(400, "Invalid input", {
        code: ERROR_CODES.VALIDATION_ERROR,
        details: validateParams.error.format(),
      });
    }

    const { groupId, filename } = validateParams.data;

    if (!groupId || !filename) {
      throw new ApiError(400, "Missing groupId or filename", {
        code: ERROR_CODES.VALIDATION_ERROR,
      });
    }

    const mediaPath = `groups/${groupId}/${filename}`;

    connection = await database.client.getConnection();

    const [rows] = await connection.execute(
      `SELECT mime_type, status FROM files WHERE media_path = ? LIMIT 1`,
      [mediaPath]
    );

    if (!rows || rows.length === 0) {
      throw new ApiError(404, "File not found", {
        code: ERROR_CODES.NOT_FOUND,
      });
    }

    const { mime_type, status } = (rows as any[])[0];

    if (status !== "ready") {
      throw new ApiError(403, "File not ready", {
        code: ERROR_CODES.FORBIDDEN,
      });
    }

    if (!allowedMimes.includes(mime_type)) {
      throw new ApiError(415, "Unsupported file type", {
        code: ERROR_CODES.VALIDATION_ERROR,
      });
    }

    const stream = await minioClient.client.getObject("media", mediaPath);

    res.setHeader("Content-Type", mime_type);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    stream.pipe(res);
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};
