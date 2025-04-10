import {
  AckPolicy,
  DeliverPolicy,
  jetstreamManager,
  ReplayPolicy,
} from "@nats-io/jetstream";
import { catchError, disableConnections, logger } from "./utils/index.js";
import { connect } from "@nats-io/transport-node";
import { database } from "./database/client.js";

const main = async () => {
  try {
    if (!process.env.POD_NAME) {
      throw new Error("POD_NAME error");
    }

    if (!process.env.POD_TIMEOUT) {
      throw new Error("POD_TIMEOUT error");
    }

    if (!process.env.STREAM_LIST) {
      throw new Error("STREAM_LIST error");
    }

    if (!process.env.FILTER_SUBJECTS) {
      throw new Error("FILTER_SUBJECTS error");
    }

    if (!process.env.SERVICE_NAME) {
      throw new Error("SERVICE_NAME error");
    }

    if (!process.env.CONSUMER_GROUP) {
      throw new Error("CONSUMER_GROUP error");
    }

    if (!process.env.DURABLE_NAME) {
      throw new Error("DURABLE_NAME error");
    }

    if (!process.env.DURABLE_NAME) {
      throw new Error("DURABLE_NAME error");
    }

    if (!process.env.DATABASE_HOST) {
      throw new Error("DATABASE_HOST error");
    }

    if (!process.env.DATABASE_PORT) {
      throw new Error("DATABASE_PORT error");
    }

    if (!process.env.DATABASE_USER) {
      throw new Error("DATABASE_USER error");
    }

    if (!process.env.DATABASE_PASSWORD) {
      throw new Error("DATABASE_PASSWORD error");
    }

    if (!process.env.DATABASE_NAME) {
      throw new Error("DATABASE_NAME error");
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

    errorEvents.forEach((e: string) =>
      process.on(e, (err) => disableConnections(e, err))
    );

    const MODU = await import(
      `./handlers/${process.env.SERVICE_NAME}/index.js`
    );

    /////////////////////////////////////////////////////////////////////////

    const databasePort = parseInt(process.env.DATABASE_PORT);

    database.connect({
      host: process.env.DATABASE_HOST,
      port: databasePort,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      waitForConnections: true,
      connectionLimit: 150,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 5000,
      connectTimeout: 30000,
      timezone: "Z",
      supportBigNumbers: true,
      bigNumberStrings: true,
    });

    const natsClient = await connect({
      name: process.env.POD_NAME as string,
      servers: ["nats:4222"],
      reconnect: true,
      pingInterval: 20 * 1000,
      maxPingOut: 5,
      reconnectTimeWait: 10 * 1000,
    });

    const jetStreamManager = await jetstreamManager(natsClient, {
      checkAPI: false,
    });

    const jetStream = jetStreamManager.jetstream();

    const streamList = process.env.STREAM_LIST.split(",");

    /////////////////////////////////////////////////////////////////////////////////////////////////

    const filterSubjects: any = process.env.FILTER_SUBJECTS
      ? process.env.FILTER_SUBJECTS.split(",").map((subject) => subject.trim())
      : [];

    console.log(filterSubjects);

    try {
      streamList.forEach(async (stream) => {
        await jetStreamManager.consumers.add(stream, {
          durable_name: process.env.DURABLE_NAME,
          deliver_group: process.env.CONSUMER_GROUP,
          ack_policy: AckPolicy.Explicit,
          deliver_policy: DeliverPolicy.All,
          replay_policy: ReplayPolicy.Instant,
          max_deliver: -1,
        });

        const consumerInfo = await jetStreamManager.consumers.info(
          stream,
          process.env.DURABLE_NAME as string
        );

        console.log(consumerInfo);

        const consumer = await jetStream.consumers.get(stream, {
          filter_subjects: filterSubjects.filter((item: string) =>
            item.startsWith(stream)
          ),
        });

        while (true) {
          const message = await consumer.next();

          if (message) {
            const maybe = await MODU.processEvent(message);

            if (maybe) {
              await message.ack();
            } else {
              await message.nak(30_000);
            }
          } else {
            console.log(`EmptyQueue`);
          }
        }
      });
    } catch (err) {
      logger.error(err);
      disableConnections(database, natsClient);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
  } catch (err) {
    catchError(err);
  }
};

main();
