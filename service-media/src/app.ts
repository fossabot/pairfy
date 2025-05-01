import "express-async-errors";
import express from "express";
import helmet from "helmet";
import cookieSession from "cookie-session";
import { getPublicAddress, RateLimiter, sellerMiddleware } from "@pairfy/common";

const app = express();

const sessionOptions: object = {
  name: "session",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  signed: false,
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

app.set("trust proxy", 1);

app.use(cookieSession(sessionOptions));

app.use(express.json({ limit: "5mb" }));

app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use(helmet());

app.use(getPublicAddress);

app.use(sellerMiddleware);

const rateLimiter = new RateLimiter(
  process.env.REDIS_RATELIMIT_URL as string
);

app.use(rateLimiter.getMiddleware());

export { app };
