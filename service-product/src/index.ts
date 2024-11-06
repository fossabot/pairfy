import express from 'express';
import http from 'http';
import cors from 'cors';
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
};

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;


const app = express();

const corsOrigin = process.env.CORS_DOMAINS!;

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

    app.use(
        "/api/product/graphql",
        cors<cors.CorsRequest>(corsOptions),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: null }),
        })
    );

    await new Promise<void>((resolve) =>
        httpServer.listen({ port: 4000 }, resolve)
    );

    console.log(`🚀 Server ready at /api/product/graphql`);
};

main();




