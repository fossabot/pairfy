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
  logger,
} from "./utils/index.js";
import { connect } from "@nats-io/transport-node";
import database from "./database/client.js";

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
     
    const streamListEnv  = process.env.STREAM_LIST as string;

    const streamList =streamListEnv.split(",");

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
          name_prefix: process.env.DURABLE_NAME as string,
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
