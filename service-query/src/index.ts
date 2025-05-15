import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { catchError, checkRedis, errorEvents } from "./utils/index.js";
import { assets, feed, products } from "./graphql/resolvers.js";
import { database } from "./database/client.js";
import { typeDefs } from "./graphql/types.js";
import { redisClient } from "./database/redis.js";
import {
  getPublicAddress,
  logger,
  normalizeGraphError
} from "@pairfy/common";

const main = async () => {
  try {
    const requiredEnvVars = [
      "DATABASE_HOST",
      "DATABASE_PORT",
      "DATABASE_USER",
      "DATABASE_PASSWORD",
      "DATABASE_NAME",
      "REDIS_HOST",
      "REDIS_RATELIMIT_URL",
    ];

    for (const varName of requiredEnvVars) {
      if (!process.env[varName]) {
        throw new Error(`${varName} error`);
      }
    }

    errorEvents.forEach((e: string) => process.on(e, (err) => catchError(err)));

    ///////////////////////////////////////////////////////////////////////////////////

    const app = express();

    const httpServer = http.createServer(app);

    const resolvers = {
      Query: {
        ...products.Query,
        ...assets.Query,
        ...feed.Query,
      },
    };

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      formatError: (formattedError, error) => {
        logger.error({
          service: "service-query",
          event: "graphql.error",
          message: "service-query graphql error",
          error: formattedError,
          stack: error,
        });

        return normalizeGraphError(error)
      },
    });

    const databasePort = parseInt(process.env.DATABASE_PORT as string);

    database.connect({
      host: process.env.DATABASE_HOST,
      port: databasePort,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    await redisClient
      .connect({
        url: process.env.REDIS_HOST,
        connectTimeout: 100000,
        keepAlive: 100000,
      })
      .then(() => checkRedis(redisClient))
      .catch((err: any) => catchError(err));

    app.set("trust proxy", 1);
    
    app.use(express.json({ limit: "5mb" }));

    app.use(express.urlencoded({ limit: "5mb", extended: true }));

    app.use(getPublicAddress);

    await server.start();

    app.use(
      "/api/query/graphql",
      expressMiddleware(server, {
        context: async ({ req }) => ({}),
      })
    );

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 8004 }, resolve)
    );

    logger.info("ONLINE");
  } catch (err) {
    catchError(err);
  }
};

main();
