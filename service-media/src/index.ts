import compression from "compression";
import database from "./database";
import * as route from "./routes";
import { app } from "./app";
import { catchError, errorEvents } from "./utils";
import { ApiError, ERROR_CODES, errorHandler, logger } from "@pairfy/common";

const main = async () => {
  try {
    const requiredEnv = [
      "POD_TIMEOUT",
      "EXPRESS_PORT",
      "EXPRESS_TIMEOUT",
      "CORS_DOMAINS",
      "AGENT_JWT_KEY",
      "TOKEN_EXPIRATION",
    ];

    for (const key of requiredEnv) {
      if (!process.env[key]) {
        throw new Error(`${key} error`);
      }
    }

    errorEvents.forEach((e: string) => process.on(e, (err) => catchError(err)));

    const databasePort = parseInt(process.env.DATABASE_PORT as string);

    database.connect({
      host: process.env.DATABASE_HOST,
      port: databasePort,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    app.post(
      "/api/media/create-image",

      route.createImageMiddlewares,

      route.createImageHandler
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
