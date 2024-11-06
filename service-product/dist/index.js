import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './graphql/types';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
const resolvers = {
    Query: {
        books: () => books,
    },
    Mutation: {
        createProduct: (parent, args) => {
            const newProduct = {
                title: args.name,
                author: '2',
            };
            books.push(newProduct);
            console.log(books);
            return newProduct;
        }
    }
};
const app = express();
const corsOrigin = process.env.CORS_DOMAINS;
const corsOptions = {
    origin: corsOrigin?.split(",") || "*",
    methods: ["GET", "POST"],
    credentials: true,
    maxAge: 86400,
    preflightContinue: false,
    exposedHeaders: ["Set-Cookie"],
    optionsSuccessStatus: 204,
};
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
const main = async () => {
    await server.start();
    app.use("/api/product/graphql", cors(corsOptions), express.json(), expressMiddleware(server, {
        context: async ({ req }) => ({ token: null }),
    }));
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
};
main();
//# sourceMappingURL=index.js.map