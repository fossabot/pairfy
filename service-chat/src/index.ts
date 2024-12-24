import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { catcher, errorEvents, logger, redisChecker } from "./utils/index.js";
import { typeDefs } from "./graphql/types.js";
import { agentMiddleware } from "./middleware/agent.js";
import { requireAuth } from "./middleware/required.js";
import { redisClient } from "./db/redis.js";
import { messages } from "./graphql/resolvers.js";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

const main = async () => {
  try {
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

    if (!process.env.AGENT_JWT_KEY) {
      throw new Error("AGENT_JWT_KEY error");
    }

    if (!process.env.REDIS_HOST) {
      throw new Error("REDIS_HOST error");
    }
    ///////////////////////////////////////////////////////////////

    const resolvers = {
      Query: {
        ...messages.Query,
      },
      Mutation: {
        ...messages.Mutation,
      },
      Subscription: {
        newMessages: {
          subscribe: async function* () {
            let id = 0;

            const agents = ["buyer", "seller", "mediator"];

            while (true) {
              await new Promise((resolve) => setTimeout(resolve, 10000));
              yield {
                newMessages: {
                  id: id++,
                  agent: agents[Math.floor(Math.random() * agents.length)],
                  content: `Message ${id}`,
                },
              };
            }
          },
        },
      },
    };

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const app = express();

    const httpServer = createServer(app);

    const wsServer = new WebSocketServer({
      server: httpServer,
      path: "/api/chat/graphql",
    });

    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
      schema,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
      formatError: (error) => {
        logger.error(error);

        return {
          message: error.message,
          details: error.message,
          code: "INTERNAL_SERVER_ERROR",
        };
      },
    });

    /////////////////////////////////////////////////////////////////

    const sessionOptions: object = {
      maxAge: 168 * 60 * 60 * 1000,
      signed: false,
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    };

    const corsOptions = {
      origin: process.env.CORS_DOMAINS.split(",") || "*",
      credentials: true,
      maxAge: 86400,
      preflightContinue: false,
      exposedHeaders: ["Set-Cookie", "Cookie"],
      optionsSuccessStatus: 204,
    };

    errorEvents.forEach((e: string) => process.on(e, (err) => catcher(err)));

    ////////////////////////////////////////////////////////////////////

    await redisClient
      .connect({
        url: process.env.REDIS_HOST,
        connectTimeout: 100000,
        keepAlive: 100000,
      })
      .then(() => console.log("redisClient connected"))
      .then(() => redisChecker(redisClient))
      .catch((err: any) => catcher(err));

    /////////////////////////////////////////////////////////////////////

    app.options("*", cors(corsOptions));

    app.use(cookieSession(sessionOptions));

    app.use(agentMiddleware);

    app.use(requireAuth);

    await server.start();

    app.use(
      "/api/chat/graphql",
      cors<cors.CorsRequest>(corsOptions),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({
          sellerData: req.sellerData || null,
          userData: req.userData || null,
        }),
      })
    );

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 4000 }, resolve)
    );

    logger.info("ONLINE");
  } catch (err) {
    catcher(err);
  }
};

main();
