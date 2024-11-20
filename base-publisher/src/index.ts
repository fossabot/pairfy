import {
  DiscardPolicy,
  jetstreamManager,
  RetentionPolicy,
  StorageType,
} from "@nats-io/jetstream";
import { catcher, logger } from "./utils/index.js";
import { database } from "./db/client.js";
import { connect } from "@nats-io/transport-node";

const main = async () => {
  try {
    if (!process.env.POD_NAME) {
      throw new Error("POD_NAME error");
    }

    if (!process.env.POD_TIMEOUT) {
      throw new Error("POD_TIMEOUT error");
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
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    const natsClient = await connect({
      name: process.env.POD_NAME,
      servers: ["nats:4222"],
      pingInterval: 20 * 1000,
      maxPingOut: 5,
      reconnectTimeWait: 10 * 1000,
    });

    const jsm = await jetstreamManager(natsClient, {
      checkAPI: false,
    });

    //await jsm.streams.delete(process.env.STREAM_NAME);

    await jsm.streams.add({
      name: process.env.STREAM_NAME,
      subjects: [process.env.STREAM_SUBJECT],
      retention: RetentionPolicy.Limits,
      storage: StorageType.File,
      max_age: 200 * 60 * 60 * 1000, // Retain messages for 200 hours (in ms)
      max_msgs: 100000, // Max number of messages to retain
      max_bytes: 5368709120, // Max size (10 GB),
      discard: DiscardPolicy.Old,
      max_consumers: -1,

    });

    const jetStream = jsm.jetstream();

    let connection: any = null;

    const queryLimit = parseInt(process.env.QUERY_LIMIT);

    const runWorker = async () => {
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

        if(!findEvents.length){
          return;
        }

        for (const event of findEvents) {
          await connection.beginTransaction();

          const [updateEvent] = await connection.execute(
            "UPDATE events SET published = ? WHERE id = ?",
            [true, event.id]
          );

          if (updateEvent.affectedRows !== 1) {
            throw new Error("UPDATE_EVENT_ERROR");
          }

          const payload = JSON.stringify(event);

          const result = await jetStream.publish(
            `${process.env.STREAM_NAME}.${event.event_type}`,
            payload,
            { msgID: event.id }
          );

          if (!result.seq) {
            throw new Error("PUBLISH_ERROR");
          }

          await connection.commit();
        }
      } catch (err: any) {
        logger.error(err);

        await connection.rollback();

      } finally {
        if (connection) {
          connection.release();
        }
      }
    };

    setInterval(runWorker, parseInt(process.env.QUERY_INTERVAL));

    logger.info("ONLINE");
  } catch (err) {
    catcher(err);
  }
};

main();
