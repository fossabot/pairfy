import express from "express";
import pkg from "body-parser";
import cors from "cors";
import helmet from "helmet";
import cookieSession from "cookie-session";
import axios from "axios";
import { catcher, logger } from "./utils/index.js";
import { geoAPI, matrixAPI } from "./api/index.js";
import { URLSearchParams } from "url";
import { getPublicAddress } from "./utils/address.js";

const { json, urlencoded } = pkg;

const main = async () => {
  try {
    if (!process.env.POD_NAME) {
      throw new Error("POD_NAME error");
    }

    if (!process.env.POD_TIMEOUT) {
      throw new Error("POD_TIMEOUT error");
    }

    if (!process.env.MATRIX_API_KEY) {
      throw new Error("MATRIX_API_KEY error");
    }

    if (!process.env.CORS_DOMAINS) {
      throw new Error("CORS_DOMAINS error");
    }
    const corsOrigin = process.env.CORS_DOMAINS as string;

    const corsOptions = {
      origin: corsOrigin?.split(",") || "*",
      methods: ["GET", "POST"],
      credentials: true,
      maxAge: 86400,
      preflightContinue: false,
      exposedHeaders: ["Set-Cookie"],
      optionsSuccessStatus: 204,
    };

    const sessionOptions: object = {
      maxAge: 168 * 60 * 60 * 1000,
      signed: false,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    };

    const app = express();

    app.set("trust proxy", 1);

    app.use(helmet());

    app.use(cors(corsOptions));

    app.use(getPublicAddress);

    app.use(urlencoded({ extended: true, parameterLimit: 15 }));

    app.use(json({ limit: 5000000 }));

    app.use(cookieSession(sessionOptions));

    const port = 8000;
    /////////////////////////////////////////////////////////////////////////

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

    errorEvents.forEach((e: string) => process.on(e, (err) => catcher(e, err)));

    app.get("/api/matrix/healthz", (req, res) => {
      res.status(200).send("OK");
    });

    app.post("/api/matrix/arrival-date", async (req, res) => {
      try {
        const params = req.body;

        console.log(params);

        const origin = "Bogotá, Cundinamarca";

        const mode = "driving";

        const destination = params.destination;

        console.log(req.publicAddress);

        const getLocation = await geoAPI.get(
          `181.132.19.47?token=f76c9e2af54296`
        );

        if (getLocation.status !== 200) {
          throw new Error("INTERNAL_ERROR");
        }

        const { city, region, country } = getLocation.data;

        const preparationTime = Math.floor(Date.now() / 1000) + 86400;

        const matrixParams = new URLSearchParams({
          origins: origin,
          destinations: `${city},${region},${country}`,
          mode: mode,
          units: "metric",
          departure_time: preparationTime.toString(),
          language: 'en',
          key: process.env.MATRIX_API_KEY as string,
        });

        const getDuration = await matrixAPI.get(
          `/maps/api/distancematrix/json?${matrixParams.toString()}`
        );

        if (getDuration.status !== 200) {
          throw new Error("INTERNAL_ERROR");
        }

        console.log(`${city},${region},${country}`);

        const { rows, status } = getDuration.data;

        if (status === "OK") {
          const element = rows[0].elements[0];

          console.log(element);

          const response = {
            success: true,
            payload: {
              distance: element.distance.text,
              duration: element.duration.value,
            },
          };

          res.status(200).send(response);
        }
      } catch (err: any) {
        console.error(err);

        res.status(404).send({ success: false });
      }
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    logger.info("ONLINE");
  } catch (err) {
    catcher(err);
  }
};

main();
