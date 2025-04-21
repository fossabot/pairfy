import express from "express";
import http from "http";
import cookieSession from "cookie-session";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { database } from "./database/client.js";
import { typeDefs } from "./graphql/types.js";
import { products } from "./graphql/resolvers.js";
import { catchError } from "./utils/index.js";
import { GraphQLError } from "graphql";
import {
  RateLimiter,
  sellerMiddleware,
  normalizeGraphError,
  sellerRequiredGraphQL,
  logger
} from "@pairfy/common";

const main = async () => {
  try {
    const requiredEnvVars = [
      "AGENT_JWT_KEY",
      "DATABASE_HOST",
      "DATABASE_PORT",
      "DATABASE_USER",
      "DATABASE_PASSWORD",
      "DATABASE_NAME",
      "REDIS_RATELIMIT_URL",
      "ADMIN_SESSION_KEY",
    ];

    for (const varName of requiredEnvVars) {
      if (!process.env[varName]) {
        throw new Error(`${varName} error`);
      }
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

    ///////////////////////////////////////////////////////////////////////////////////

    const app = express();

    const httpServer = http.createServer(app);

    const resolvers = {
      Query: {
        ...products.Query,
      },
      Mutation: {
        ...products.Mutation,
      },
    };

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],

      formatError: (formattedError, error) => {
        let original: unknown = error;
      
        if (error instanceof GraphQLError && error.originalError) {
          original = error.originalError;
        }
      
        return normalizeGraphError(original);
      }
      
    });

    const databasePort = parseInt(process.env.DATABASE_PORT as string);

    database.connect({
      host: process.env.DATABASE_HOST,
      port: databasePort,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    const sessionOptions: object = {
      name: "session",
      keys: [process.env.ADMIN_SESSION_KEY as string],
      maxAge: 7 * 24 * 60 * 60 * 1000,
      signed: true,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    };

    app.set("trust proxy", 1);

    app.use(cookieSession(sessionOptions));

    app.use(sellerMiddleware);

    app.use(sellerRequiredGraphQL);

    const rateLimiter = new RateLimiter(
      process.env.REDIS_RATELIMIT_URL as string
    );

    app.use(rateLimiter.getMiddleware());

    await server.start();

    app.use(
      "/api/product/graphql",
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ sellerData: req.sellerData }),
      })
    );

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 8001 }, resolve)
    );

    logger.info("ONLINE");
  } catch (err) {
    catchError(err)
  }
};

main();
