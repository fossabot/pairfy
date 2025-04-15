import * as route from "./routes";
import database from "./database";
import compression from "compression";
import logger from "./common/logger";
import { catchError } from "./utils";
import { app } from "./app";

import { ApiError, errorHandler } from "./common/errorHandler";

const main = async () => {
  try {
    const requiredEnvVars = [
      "EXPRESS_PORT",
      "EXPRESS_TIMEOUT",
      "AGENT_JWT_KEY",
      "TOKEN_EXPIRATION",
      "DATABASE_HOST",
      "DATABASE_PORT",
      "DATABASE_USER",
      "DATABASE_PASSWORD",
      "DATABASE_NAME",
      "ADMIN_SESSION_SECRET",
      "REDIS_RATE_LIMIT"
    ];
    
    for (const key of requiredEnvVars) {
      if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
      }
    }

    const databasePort = parseInt(process.env.DATABASE_PORT as string)

    database.connect({
      host: process.env.DATABASE_HOST,
      port: databasePort,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    });

    const errorEvents: string[] = [
      "exit",
      "SIGINT",
      "SIGTERM",
      "SIGQUIT",
      "uncaughtException",
      "unhandledRejection",
      "SIGHUP",
      "SIGCONT"
    ];

    errorEvents.forEach((e: string) => process.on(e, (err) => catchError(err)));
    
    app.post(
      "/api/seller/create-seller",

      route.createSellerMiddlewares,

      route.createSellerHandler
    );

    app.post(
      "/api/seller/verify-seller",

      route.verifySellerMiddlewares,

      route.verifySellerHandler
    );

    app.post(
      "/api/seller/login-seller",

      route.loginSellerMiddlewares,

      route.loginSellerHandler
    );

    app.get(
      "/api/seller/current-seller",

      route.currentSellerMiddlewares,

      route.currentSellerHandler
    );

    app.get(
      "/api/seller/logout-seller",

      route.logoutHandler
    );

    app.get("/api/seller/ping", (req, res) => {
      res.status(200).send('Test OK');
    });

    app.all("*", (req, _res, next) => {
      next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`, {
        code: "ROUTE_NOT_FOUND",
      }));
    });

    app.use(errorHandler as any);

    app.use(compression());

    app.listen(process.env.EXPRESS_PORT, () =>
      logger.info(`express server listening in ${process.env.EXPRESS_PORT}`)
    );

  } catch (e) {
    catchError(e);
  }
};

main();
