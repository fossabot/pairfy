import { catcher, logger } from './utils/index.js';
import { database } from './db/client.js';


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

        const errorEvents: string[] = [
            "exit",
            "SIGINT",
            "SIGTERM",
            "SIGQUIT",
            "uncaughtException",
            "unhandledRejection",
        ];

        errorEvents.forEach((e: string) => process.on(e, (err) => catcher(err)));

        database.connect({
            host: "mysql",
            port: 3306,
            user: "marketplace",
            password: "password",
            database: "service_product",
        });

        logger.info("ONLINE");

    } catch (err) {
        catcher(err)
    }

};

main();




