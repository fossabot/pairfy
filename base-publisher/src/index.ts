import {
  DiscardPolicy,
  jetstreamManager,
  RetentionPolicy,
  StorageType,
} from "@nats-io/jetstream";
import { catchError, errorEvents, logger, sleep } from "./utils/index.js";
import { watchDatabase } from "./database/ping.js";
import { database } from "./database/client.js";
import { connect } from "@nats-io/transport-node";

const main = async () => {
  try {
    if (!process.env.POD_NAME) {
      throw new Error("POD_NAME error");
    }

    if (!process.env.POD_TIMEOUT) {
      throw new Error("POD_TIMEOUT error");
    }

    if (!process.env.DATABASE_HOST) {
      throw new Error("DATABASE_HOST error");
    }

    if (!process.env.DATABASE_PORT) {
      throw new Error("DATABASE_PORT error");
    }

    if (!process.env.DATABASE_PASSWORD) {
      throw new Error("DATABASE_PASSWORD error");
    }

    if (!process.env.DATABASE_NAME) {
      throw new Error("DATABASE_NAME error");
    }

    if (!process.env.DATABASE_USER) {
      throw new Error("DATABASE_USER error");
    }

    if (!process.env.STREAM_NAME) {
      throw new Error("STREAM_NAME error");
    }

    if (!process.env.STREAM_SUBJECT) {
      throw new Error("STREAM_SUBJECT error");
    }

    if (!process.env.QUERY_INTERVAL) {
      throw new Error("QUERY_INTERVAL error");
    }

    if (!process.env.QUERY_LIMIT) {
      throw new Error("QUERY_LIMIT error");
    }

    errorEvents.forEach((e: string) => process.on(e, (err) => catchError(err)));

    const databasePort = parseInt(process.env.DATABASE_PORT);

    const queryLimit = parseInt(process.env.QUERY_LIMIT);

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

    watchDatabase();

    const natsClient = await connect({
      name: process.env.POD_NAME,
      servers: ["nats:4222"],
      reconnect: true,
      pingInterval: 20 * 1000,
      maxPingOut: 5,
      reconnectTimeWait: 10 * 1000,
    });

    const jetStreamManager = await jetstreamManager(natsClient, {
      checkAPI: false,
    });

    await jetStreamManager.streams.add({
      name: process.env.STREAM_NAME,
      subjects: [process.env.STREAM_SUBJECT],
      retention: RetentionPolicy.Limits,
      storage: StorageType.File,
      max_age: 0,
      max_msgs: -1,
      max_bytes: -1,
      discard: DiscardPolicy.Old,
      max_consumers: -1,
      num_replicas: 3,
    });

    await jetStreamManager.streams.info(process.env.STREAM_NAME);

    const jetStream = jetStreamManager.jetstream();

    let connection: any = null;

    while (true) {
      console.log("Iteration");

      await sleep(parseInt(process.env.QUERY_INTERVAL));

      try {
        connection = await database.client.getConnection();

        const [findEvents] = await connection.query(
          `
          SELECT * FROM events
          WHERE published = ?
          ORDER BY created_at ASC
          LIMIT ? 
          FOR UPDATE SKIP LOCKED`,
          [false, queryLimit]
        );

        if (findEvents.length < 1) continue;

        console.log("Publishing: " + findEvents.length);

        for (const EVENT of findEvents) {
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////

          try {
            await connection.beginTransaction();

            const [updateEvent] = await connection.execute(
              "UPDATE events SET published = ? WHERE id = ?",
              [true, EVENT.id]
            );

            if (updateEvent.affectedRows !== 1) {
              throw new Error("updateEventError");
            }

            const eventSubject = process.env.STREAM_NAME + "." + EVENT.type;

            const eventData = JSON.stringify(EVENT);

            const publishEvent = await jetStream.publish(
              eventSubject,
              eventData,
              {
                msgID: EVENT.id,
              }
            );

            if (!publishEvent.seq) {
              throw new Error("eventPublishError");
            }

            await connection.commit();
          } catch (err) {
            logger.error(err);

            continue;
          }

          /////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }
      } catch (err: any) {
        logger.error(err);

        if (connection) {
          await connection.rollback();
        }
      } finally {
        if (connection) {
          connection.release();
        }
      }
    }
  } catch (err) {
    catchError(err);
  }
};

main();
