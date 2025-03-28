import * as route from "./routes";
import compression from "compression";
import database from "./database";
import { catchError } from "./pod/index";
import { NotFoundError, errorMiddleware } from "./errors";
import { logger } from "./utils";
import { app } from "./app";

const main = async () => {
  try {
    if (!process.env.POD_TIMEOUT) {
      throw new Error("POD_TIMEOUT error");
    }

    if (!process.env.EXPRESS_PORT) {
      throw new Error("EXPRESS_PORT error");
    }

    if (!process.env.EXPRESS_TIMEOUT) {
      throw new Error("EXPRESS_TIMEOUT error");
    }

    if (!process.env.CORS_DOMAINS) {
      throw new Error("CORS_DOMAINS error");
    }

    if (!process.env.AGENT_JWT_KEY) {
      throw new Error("AGENT_JWT_KEY error");
    }

    if (!process.env.ADMIN_JWT_KEY) {
      throw new Error("ADMIN_JWT_KEY error");
    }

    if (!process.env.TOKEN_EXPIRATION) {
      throw new Error("TOKEN_EXPIRATION error");
    }

    if (!process.env.DATABASE_HOST) {
      throw new Error("DATABASE_HOST error");
    }

    if (!process.env.DATABASE_PORT) {
      throw new Error("DATABASE_PORT error");
    }

    if (!process.env.DATABASE_USER) {
      throw new Error("DATABASE_USER error");
    }

    if (!process.env.DATABASE_PASSWORD) {
      throw new Error("DATABASE_PASSWORD error");
    }

    if (!process.env.DATABASE_NAME) {
      throw new Error("DATABASE_NAME error");
    }

    const errorEvents: string[] = [
      "exit",
      "SIGINT",
      "SIGTERM",
      "SIGQUIT",
      "uncaughtException",
      "unhandledRejection",
      "SIGHUP",
      "SIGCONT",
    ];

    errorEvents.forEach((e: string) => process.on(e, (err) => catchError(err)));

    database.connect({
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    app.post(
      "/api/user/login-user",

      route.loginUserMiddlewares,

      route.loginUserHandler
    );

    app.post(
      "/api/user/delete-user",

      route.deleteUserMiddlewares,

      route.deleteUserHandler
    );

    app.get(
      "/api/user/current-user",

      route.currentUserMiddlewares,

      route.currentUserHandler
    );

    app.get("/api/user/logout", route.logoutHandler);

    app.get("/api/user/ping", (req, res) => {
      res.status(200).send("Test OK");
    });

    app.all("*", (_req, _res) => {
      throw new NotFoundError();
    });

    app.use(errorMiddleware as any);

    app.use(compression());

    const port = process.env.EXPRESS_PORT || "8000";

    const timeout = process.env.EXPRESS_TIMEOUT || "5000";

    const server = app.listen(port, () => logger.info(`ServerStart:${port}`));

    server.setTimeout(parseInt(timeout));
  } catch (e) {
    catchError(e);
  }
};

main();
