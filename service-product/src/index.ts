import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createPool, PoolOptions, Pool } from "mysql2/promise";
import { Logger } from "tslog";
import { customAlphabet } from "nanoid";

const logger = new Logger({ name: "service-product" });

const catcher = (message?: any, error?: any, bypass?: boolean) => {
    logger.error(`EXIT=>${message}-${error}`);

    return bypass || process.exit(1);
};

const getProductId = customAlphabet("0123456789ABCDEFGHIKLMNOPQRSTUVWXYZ", 15);

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
}

input CreateProductInput {
  name: String!
  price: Int! 
  collateral: Int!
  sku: String!              
  model: String!
  brand: String!
  features: String!
  category: String!
  keywords: String!
  stock: Int!
  color: String!
  color_name: String!
  quality: String!
  image_set: String!
  video_set: String!
}

type Mutation {
  createProduct(createProductInput: CreateProductInput!): CreateProductResponse!
}

#/////////////////////////////////////////////////

`;

///////////////////////////////////////////////////////////////////


const createProduct = async (args: any) => {
    const params = args.createProductInput;

    const SELLER = "";

    let connection = null;

    try {
        if (params.collateral >= params.price) {
            throw new Error("MAX_COLLATERAL");
        }

        connection = await database.client.getConnection();

        await connection.beginTransaction();

        const schemeData = `
      INSERT INTO products (
        id,
        seller_id,
        name,
        price,  
        collateral,
        sku,              
        model,
        brand,
        features,
        category,
        keywords,
        stock,
        color,
        color_name,
        quality,
        country,
        media_url,
        media_path,
        image_set,
        video_set,
        schema_v
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const schemeValue = [
            "P" + getProductId(),
            "seller_id",
            params.name,
            params.price,
            params.collateral,
            params.sku,
            params.model,
            params.brand,
            params.features,
            params.category,
            params.keywords,
            params.stock,
            params.color,
            params.color_name,
            params.quality,
            "country",
            "https://pairfy.dev",
            "/api/media/get-image/",
            params.image_set,
            params.video_set,
            0,
        ];

        await connection.execute(schemeData, schemeValue);

        await connection.commit();

        return { success: true }

    } catch (err) {
        await connection.rollback();

        logger.error(err);
    } finally {
        connection.release();
    }
};







//////////////////////////////////////////////////////////////////

const resolvers = {
    Query: {
        getProduct: (id: any) => [],
        books: () => books
    },
    Mutation: {
        createProduct: (_: any, args: any) => createProduct(args)
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

        logger.info("DB");

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

        logger.info("ONLINE");

    } catch (err) {
        catcher(err)
    }

};

main();




