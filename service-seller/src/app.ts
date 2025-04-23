import cookieSession from "cookie-session";
import "express-async-errors";
import express from "express";
import helmet from "helmet";
import { json } from "body-parser";
import { getPublicAddress, RateLimiter } from "@pairfy/common";

const app = express();

const sessionOptions: object = {
  name: 'session',
  maxAge: 7 * 24 * 60 * 60 * 1000, 
  signed: false,
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none'
};


app.set("trust proxy", 1);

app.use(helmet());

app.use(json({ limit: '5mb' }));

app.use(getPublicAddress);

app.use(cookieSession(sessionOptions));

const rateLimiter = new RateLimiter(process.env.REDIS_RATE_LIMIT as string);

app.use(rateLimiter.getMiddleware())

export { app };
