import {
  AckPolicy,
  DeliverPolicy,
  jetstreamManager,
  ReplayPolicy,
} from "@nats-io/jetstream";
import {
  catchError,
  checkHandlerVariables,
  disableConnections,
  errorEvents,
} from "./utils/index.js";
import { connect } from "@nats-io/transport-node";
import database from "./database/client.js";
import { logger } from "@pairfy/common";

const main = async () => {
  try {
    const requiredEnvVars = [
      "POD_NAME",
      "STREAM_LIST",
      "FILTER_SUBJECTS",
      "SERVICE_NAME",
      "CONSUMER_GROUP",
      "DURABLE_NAME",
      "DATABASE_HOST",
      "DATABASE_PORT",
      "DATABASE_USER",
      "DATABASE_PASSWORD",
      "DATABASE_NAME",
      "NATS_SERVERS",
    ];

    for (const varName of requiredEnvVars) {
      if (!process.env[varName]) {
        throw new Error(`${varName} error`);
      }
    }

    checkHandlerVariables();

    errorEvents.forEach((e: string) =>
      process.on(e, (err) => disableConnections(e, err))
    );

    const MODU = await import(
      `./handlers/${process.env.SERVICE_NAME}/index.js`
    );

    /////////////////////////////////////////////////////////////////////////

    const databasePort = parseInt(process.env.DATABASE_PORT as string);

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
      servers: (process.env.NATS_SERVERS as string).split(","),
      pingInterval: 20 * 1000,
      maxPingOut: 5,
      reconnectTimeWait: 10 * 1000,
    });

    const jetStreamManager = await jetstreamManager(natsClient, {
      checkAPI: false,
    });

    const jetStream = jetStreamManager.jetstream();

    const streamList = (process.env.STREAM_LIST as string).split(",");

    const filterSubjects: any = process.env.FILTER_SUBJECTS
      ? process.env.FILTER_SUBJECTS.split(",").map((subject) => subject.trim())
      : [];

    /////////////////////////////////////////////////////////////////////////////////////////////////

    try {
      await Promise.all(
        streamList.map(async (stream) => {
          try {
            await jetStreamManager.consumers.info(
              stream,
              process.env.DURABLE_NAME as string
            );
            console.log(
              `ℹ️ Consumer ${process.env.DURABLE_NAME} already exists on stream: ${stream}`
            );
          } catch (error: any) {
            if (error.message.includes("consumer not found")) {
              console.log(
                `✅ Creating consumer ${process.env.DURABLE_NAME} for stream: ${stream}`
              );
              await jetStreamManager.consumers.add(stream, {
                deliver_group: process.env.CONSUMER_GROUP,
                ack_policy: AckPolicy.Explicit,
                deliver_policy: DeliverPolicy.All,
                replay_policy: ReplayPolicy.Instant,
                max_deliver: -1,
              });
            } else {
              throw error;
            }
          }
        })
      );

      streamList.forEach(async (stream) => {
        const consumer = await jetStream.consumers.get(stream, {
          name_prefix: process.env.DURABLE_NAME,
          filter_subjects: filterSubjects.filter((item: string) =>
            item.startsWith(stream)
          ),
        });

        console.log(`🎧 Listening on stream: ${stream}`);

        while (true) {
          const message = await consumer.next();

          if (message) {
            const success = await MODU.processEvent(message);
            await (success ? message.ack() : message.nak(30_000));
          } else {
            console.log(`🔍 EmptyQueue for stream: ${stream}`);
          }
        }
      });
    } catch (error: any) {
      logger.error(error);
      await disableConnections(database, natsClient);
      throw error;
    }
  } catch (err) {
    catchError(err);
  }
};

main();
