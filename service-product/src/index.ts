import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createPool, PoolOptions, Pool } from "mysql2/promise";
import { Logger } from "tslog";

const logger = new Logger({ name: "myLogger" });

const catcher = (message?: any, error?: any, bypass?: boolean) => {
    logger.error(`EXIT=>${message}-${error}`);

    return bypass || process.exit(1);
};

/////////////////////////////////

class DatabaseWrap {
    private _client?: any;

    get client() {
        if (!this._client) {
            throw new Error("Cannot access the client before connecting");
        }

        return this._client;
    }

    connect(options: PoolOptions): Pool {
        this._client = createPool(options);
        return this.client;
    }
}

const database = new DatabaseWrap();



/////////////////////////////////
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


const typeDefs = `#graphql

type Product {
  id: String
  seller_id: String
  name: String
  model: String
  features: String
  terms_of_sale: String
  guarantee: String
  category: String
  price: Int
  collateral: Int
  discount: Int
  stock: Int
  keywords: String
  media_url: String
  media_path: String
  image_main: String
  image_set: String
  video_set: String
}

type Book {
    title: String
    autor: String
}
type Query {
  getProduct(id: String): [Product]
  books: [Book]
}

#/////////////////////////////////////////////////

type CreateProductResponse {
  success: Boolean!
  payload: Book!
}

input CreateProductInput {
  name: String!
}

type Mutation {
  createProduct(createProductInput: CreateProductInput!): CreateProductResponse!
}

#/////////////////////////////////////////////////

`;



const resolvers = {
    Query: {
        getProduct: (id: any) => [],
        books: () => books
    },
    Mutation: {
        createProduct: (_: any, args: any) => {
            const newProduct = {
                title: args.createProductInput.name,
                author: '2',
            };

            books.push(newProduct);

            console.log(books);

            const response = {
                success: true,
                payload: newProduct
            }

            return response;
        }
    }
};



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

        database.connect({
            host: "mysql",
            port: 3306,
            user: "marketplace",
            password: "password",
            database: "service_product",
        });

        const errorEvents: string[] = [
            "exit",
            "SIGINT",
            "SIGTERM",
            "SIGQUIT",
            "uncaughtException",
            "unhandledRejection",
        ];


        errorEvents.forEach((e: string) => process.on(e, (err) => catcher(err)));

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

    } catch (err) {
        catcher(err)
    }

};

main();




