import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieSession from "cookie-session";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { catcher, logger } from './utils/index.js';
import { database } from './db/client.js';
import { typeDefs } from './graphql/types.js';
import { books } from './graphql/resolvers.js';
import { sellerMiddleware } from './middleware/seller.js';
import { requireAuth } from './middleware/required.js';

const app = express();

const httpServer = http.createServer(app);

const resolvers = {
    Query: {
        ...books.Query
    },
    Mutation: {
        ...books.Mutation
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: (error) => {
        logger.error(error);

        return {
            message: error.message,
            details: error.message,
            code: 'INTERNAL_SERVER_ERROR',
        }
    }
});

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

        if (!process.env.SELLER_JWT_KEY) {
            throw new Error("SELLER_JWT_KEY error");
        }

        if (!process.env.TOKEN_EXPIRATION) {
            throw new Error("TOKEN_EXPIRATION error");
        }

        const sessionOptions: object = {
            maxAge: 168 * 60 * 60 * 1000,
            signed: false,
            secure: true,
            httpOnly: true,
            sameSite: "strict",
        };

        const corsOrigin = process.env.CORS_DOMAINS;

        const corsOptions = {
            origin: corsOrigin.split(",") || "*",
            credentials: true,
            maxAge: 86400,
            preflightContinue: false,
            exposedHeaders: ["Set-Cookie", "Cookie"],
            optionsSuccessStatus: 204,
        };

        const errorEvents: string[] = [
            "exit",
            "SIGINT",
            "SIGTERM",
            "SIGQUIT",
            "uncaughtException",
            "unhandledRejection",
            "SIGHUP",
            "SIGCONT"
        ];

        errorEvents.forEach((e: string) => process.on(e, (err) => catcher(err)));

        app.options('*', cors(corsOptions));

        database.connect({
            host: "mysql",
            port: 3306,
            user: "marketplace",
            password: "password",
            database: "service_gateway",
        });

        app.use(cookieSession(sessionOptions));

        app.use(sellerMiddleware);

        app.use(requireAuth);

        await server.start();

        app.use(
            "/api/gateway/graphql",
            cors<cors.CorsRequest>(corsOptions),
            express.json(),
            expressMiddleware(server, {
                context: async ({ req }) => ({ sellerData: req.sellerData }),
            })
        );

        await new Promise<void>((resolve) =>
            httpServer.listen({ port: 4000 }, resolve)
        );

        logger.info("ONLINE");

    } catch (err) {
        catcher(err)
    }

};

main();




