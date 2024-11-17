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

        const natsClient = await connect({
            name: podName,
            servers: ["nats:4222"],
            pingInterval: 20 * 1000,
            maxPingOut: 5,
            reconnectTimeWait: 10 * 1000
        });

        console.log(`connected to ${natsClient.getServer()}`);


        const jsm = await jetstreamManager(natsClient, {
            checkAPI: false
        });

        const STREAM_NAME = "product";

        const EVENT_SUBJECTS = STREAM_NAME + ".*"

        await jsm.streams.add({
            name: STREAM_NAME,
            subjects: [EVENT_SUBJECTS],
            retention: RetentionPolicy.Workqueue,
            storage: StorageType.File
        });

        const jetStream = jsm.jetstream();

        const runWorker = async () => {
            let connection = null;

            try {
                connection = await database.client.getConnection();

                await connection.beginTransaction();

                const [findEvents] = await connection.execute("SELECT * FROM events WHERE published = ?", [false]);

                console.log(findEvents);

                for (const event of findEvents.rows) {

                    let ack = await jetStream.publish(`${STREAM_NAME}.${event.event_type}`, event.payload, { msgID: event.id });

                    console.log(ack);

                    const updateEvent = await connection.execute("UPDATE events SET published = ? WHERE id = ?", [true, event.id]);

                    if (updateEvent.affectedRows !== 1) {
                        throw new Error('UPDATE_EVENT_ERROR');
                    }
                }

                await connection.commit();

            } catch (err: any) {
                await connection.rollback();

                throw new Error(err.message);
            } finally {
                if (connection) {
                    connection.release();
                }
            }
        }

        const workerInterval = setInterval(runWorker, 5000);

        logger.info("ONLINE");

    } catch (err) {
        catcher(err)
    }

};

main();




