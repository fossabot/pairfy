import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import jwt from 'jsonwebtoken';

const redis = new Redis();

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 20;

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    const token = req.session?.jwt;
    let key: string;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string };
        if (decoded?.sub) {
          key = `rl:user:${decoded.sub}`;
        } else {
          key = `rl:ip:${req.publicAddress}`;
        }
      } catch {
        key = `rl:ip:${req.publicAddress}`; 
      }
    } else {
      key = `rl:ip:${req.publicAddress}`;
    }

    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, WINDOW_SECONDS);
    }

    if (current > MAX_REQUESTS) {
      res.status(429).json({ message: 'Too many requests' });
      return;
    }
    
    next();
  } catch (err) {
    console.error('Rate limit error:', err);
    res.status(500).json({ message: 'Internal rate limit error' });
  }
};





