import { catcher, logger } from './utils/index.js';
import { database } from './db/client.js';
import { connect } from "@nats-io/transport-node";
import { jetstreamManager, RetentionPolicy, StorageType } from "@nats-io/jetstream";

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

        const serviceName = "service-product"

        const podName = "axxxxx";

        const nc = await connect({
            name: podName,
            servers: ["nats:4222"],
            pingInterval: 20 * 1000,
            maxPingOut: 5,
            reconnectTimeWait: 10 * 1000
        });

        console.log(`connected to ${nc.getServer()}`);

        const stats = nc.stats();

        console.log(stats);

        const jsm = await jetstreamManager(nc, {
            checkAPI: false
        });

        const streams = await jsm.streams.list().next();
        streams.forEach((si) => {
            console.log(si);
        });

        console.log("1");

        await jsm.streams.add({
            name: "product",
            subjects: ["product.*"],
            retention: RetentionPolicy.Workqueue,
            storage: StorageType.File
        });

        console.log("2");

        const js = jsm.jetstream();

        console.log("3");

        let pa = await js.publish("product.createProduct", "paylo", { msgID: "ocuhxqo6" });

        console.log(pa);

        const stream = pa.stream;

        const seq = pa.seq;

        const duplicate = pa.duplicate;

        logger.info("ONLINE");

    } catch (err) {
        catcher(err)
    }

};

main();




