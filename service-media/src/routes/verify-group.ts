import database from "../database/index.js";
import { ApiError, createEvent, ERROR_CODES } from "@pairfy/common";
import type { Request, Response, NextFunction } from "express";
import { verifyParams } from "../validators/verify-group.js";
import { internalAuth } from "../utils/internalAuth.js";

export const verifyGroupMiddlewares: any = [internalAuth];

export const verifyGroupHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let connection;

  try {
    const validateParams = verifyParams.safeParse(req.body);

    if (!validateParams.success) {
      throw new ApiError(400, "Invalid input", {
        code: ERROR_CODES.VALIDATION_ERROR,
        details: validateParams.error.format(),
      });
    }

    const { media_group_id, agent_id, file_ids } = validateParams.data;

    connection = await database.client.getConnection();

    await connection.beginTransaction();

    ///////////////////////////////////////////////////////////////////////////////////////////
    const timestamp = Date.now();

    const [rows] = await connection.query(
      `SELECT * FROM files 
         WHERE media_group_id = ? 
         AND agent_id = ?
         AND id IN (?)`,
      [media_group_id, agent_id, file_ids]
    );

    if (rows.length === 0) {
      throw new ApiError(404, "No matching files found", {
        code: ERROR_CODES.NOT_FOUND,
      });
    }

    const foundIds = rows.map((r: any) => r.id);

    const missing = file_ids.filter((id) => !foundIds.includes(id));

    if (missing.length > 0) {
      throw new ApiError(404, `Missing file_ids: ${missing.join(", ")}`, {
        code: ERROR_CODES.NOT_FOUND,
      });
    }

    await connection.query(
      `
       UPDATE files SET status = 'processing' 
       WHERE id IN (?) 
       AND media_group_id = ? 
       AND agent_id = ?
       AND status = 'pending'
       `,
      [foundIds, media_group_id, agent_id]
    );

    const pendingFiles = rows.filter((file: any) => file.status === "pending");

    for (const file of pendingFiles) {
      const eventData = {
        bucket: "media",
        file,
      };

      await createEvent(
        connection,
        timestamp,
        "service-media",
        "ProductFile",
        JSON.stringify(eventData),
        agent_id
      );
    }

    ///////////////////////////////////////////////////////////////////////////////////////////

    await connection.commit();

    res.status(200).json({
      success: true,
      data: { media_group_id, file_ids },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
