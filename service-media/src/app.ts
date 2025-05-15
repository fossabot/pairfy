import "express-async-errors";
import express from "express";
import helmet from "helmet";
import cookieSession from "cookie-session";
import { getPublicAddress, RateLimiterJWT, sellerMiddleware, sellerRequired } from "@pairfy/common";

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

app.use(helmet());

app.use(getPublicAddress);

app.use(sellerMiddleware);

const rateLimiter = new RateLimiterJWT({
  redisUrl: process.env.REDIS_RATELIMIT_URL as string,
  jwtSecret: process.env.AGENT_JWT_KEY as string,
  maxRequests: 20,
  windowSeconds: 60,
  source: 'service-media'
});

app.use(rateLimiter.middleware());

export { app };
