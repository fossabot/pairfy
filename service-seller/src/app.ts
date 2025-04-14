import "express-async-errors";
import express from "express";
import helmet from "helmet";
import cookieSession from "cookie-session";
import { json } from "body-parser";
import { getPublicAddress } from "./utils/address";
import { rateLimiter } from "./common/rateLimiter";

const app = express();

const sessionOptions: object = {
  name: 'session',
  keys: [process.env.ADMIN_SESSION_SECRET as string],
  maxAge: 7 * 24 * 60 * 60 * 1000,
  signed: true,
  secure: true,
  httpOnly: true,
  sameSite: "none", 
};

app.set("trust proxy", 1);

app.use(helmet());

app.use(getPublicAddress);

app.use(json({ limit: '5mb' }));

app.use(cookieSession(sessionOptions));

app.use(rateLimiter)

export { app };
