import compression from "compression";
import * as route from "./routes";
import { catcher, check, checkpoint } from "./pod/index";
import { NotFoundError, errorMiddleware } from "./errors";
import { app } from "./app";

const main = async () => {
  try {
    if (!process.env.ENV_MODE) {
      throw new Error("ENV_MODE error");
    }

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

    if (!process.env.DEV_IP) {
      throw new Error("DEV_IP error");
    }

    if (!process.env.GEO_TOKEN) {
      throw new Error("GEO_TOKEN error");
    }

    checkpoint("ready");

    const errorEvents: string[] = [
      "exit",
      "SIGINT",
      "SIGTERM",
      "SIGQUIT",
      "uncaughtException",
      "unhandledRejection",
    ];

    errorEvents.forEach((e: string) => process.on(e, (err) => catcher(err)));

    app.post(
      "/api/location/get-location",

      [],

      route.getLocation
    );

    app.get("/api/location/ping", (req, res) => {
      res.status(200).json({ status: "Test OK" });
    });

    app.all("*", (_req, _res) => {
      throw new NotFoundError();
    });

    app.use(errorMiddleware as any);

    app.use(compression());
  } catch (e) {
    catcher(e);
  }
  check();
};

main();
