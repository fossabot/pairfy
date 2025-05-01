import compression from "compression";
import database from "./database/index.js";
import * as route from "./routes/index.js";
import { catchError, errorEvents } from "./utils/index.js";
import { ApiError, ERROR_CODES, errorHandler, logger } from "@pairfy/common";
import { ensureBucketExists, minioClient } from "./common/minioClient.js";
import { app } from "./app.js";

const main = async () => {
  try {
    const requiredEnv = ["AGENT_JWT_KEY", "MINIO_HOST_URL"];

    for (const key of requiredEnv) {
      if (!process.env[key]) {
        throw new Error(`${key} error`);
      }
    }

    errorEvents.forEach((e: string) => process.on(e, (err) => catchError(err)));

    minioClient.connect({
      endPoint: process.env.MINIO_ENDPOINT || "localhost",
      port: parseInt(process.env.MINIO_PORT || "9000", 10),
      useSSL: process.env.MINIO_USE_SSL === "true",
      accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
      secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
    });

    ensureBucketExists(minioClient.client, "media");

    const databasePort = parseInt(process.env.DATABASE_PORT as string);

    database.connect({
      host: process.env.DATABASE_HOST,
      port: databasePort,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    app.post(
      "/api/media/create-files",

      route.createFilesMiddlewares,

      route.createFilesHandler
    );

    app.get(
      "/api/media/get-image/:mediaId",

      route.getImageMiddlewares,

      route.getImageHandler
    );

    app.post(
      "/api/media/delete-image",

      route.deleteImageMiddlewares,

      route.deleteImageHandler
    );

    app.get("/api/media/ping", (req, res) => {
      res.status(200).json({ success: true, data: { message: "Test OK" } });
    });

    app.all("*", (req, _res, next) => {
      next(
        new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`, {
          code: ERROR_CODES.NOT_FOUND,
        })
      );
    });

    app.use(errorHandler);

    app.use(compression());

    app.listen(8003, () => logger.info(`express server listening in 8003`));
  } catch (e) {
    catchError(e);
  }
};

main();
