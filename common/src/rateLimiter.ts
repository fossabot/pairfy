import { Request, Response, NextFunction, RequestHandler } from 'express';
import Redis from 'ioredis';

interface RateLimiterOptions {
  windowMs?: number;
  maxRequests?: number;
  serviceName?: string;
}

export class RateLimiterId {
  private redisClient: Redis;
  private windowMs: number;
  private maxRequests: number;
  private serviceName: string;

  constructor(redisUrl: string, options?: RateLimiterOptions) {
    this.redisClient = new Redis(redisUrl);
    this.windowMs = options?.windowMs ?? 15 * 60 * 1000;
    this.maxRequests = options?.maxRequests ?? 100;
    this.serviceName = options?.serviceName ?? 'unknown-service';
  }

  private getRateLimitHeaders(limit: number, remaining: number, resetMs: number) {
    return {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': Math.floor(resetMs / 1000).toString(),
    };
  }

  public getMiddleware(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const jwt = req.session?.jwt;

      if (!jwt) {
        console.log(`[RateLimiter][${this.serviceName}] ❌ Falta req.session.jwt`);
        res.status(401).json({ error: 'Unauthorized: session JWT missing.' });
        return;
      }

      const key = `ratelimit:${jwt}`;

      try {
        // Ejecutamos multi para INCR y obtener TTL al mismo tiempo
        const multi = this.redisClient.multi();
        multi.incr(key);
        multi.pttl(key);

        const results = await multi.exec();
        if (!results) throw new Error('Redis multi exec falló');

        const [incrResult, ttlResult] = results;
        if (incrResult[0]) throw incrResult[0];
        if (ttlResult[0]) throw ttlResult[0];

        const currentCount = incrResult[1] as number;
        let ttl = ttlResult[1] as number;

        // Si no hay expiración asignada, la ponemos
        if (ttl === -1) {
          // Usamos pexpire solo si es necesario para evitar sobrescribir TTL
          await this.redisClient.pexpire(key, this.windowMs);
          ttl = this.windowMs;
        } else if (ttl === -2) {
          // TTL -2 significa que la clave no existe, pero la incrementamos justo antes, así que no debería pasar
          // por seguridad le ponemos expire
          await this.redisClient.pexpire(key, this.windowMs);
          ttl = this.windowMs;
        }

        const remaining = Math.max(this.maxRequests - currentCount, 0);
        const headers = this.getRateLimitHeaders(this.maxRequests, remaining, Date.now() + ttl);
        res.set(headers);

        if (currentCount > this.maxRequests) {
          console.log(`[RateLimiter][${this.serviceName}] ⛔ Límite excedido. JWT=${jwt}, Count=${currentCount}, Limit=${this.maxRequests}`);
          res.set('Retry-After', Math.ceil(ttl / 1000).toString());
          res.status(429).json({
            error: 'Too many requests, please try again later.',
          });
          return;
        }

        console.log(`[RateLimiter][${this.serviceName}] ✅ JWT=${jwt}, Count=${currentCount}/${this.maxRequests}`);
        next();
      } catch (error) {
        console.log(`[RateLimiter][${this.serviceName}] 🔥 Error Redis:`, error);
        res.status(503).json({
          error: 'Service unavailable due to rate limiter backend failure.',
        });
      }
    };
  }

  public async close(): Promise<void> {
    await this.redisClient.quit();
    console.log(`[RateLimiter][${this.serviceName}] Redis connection closed.`);
  }
}
