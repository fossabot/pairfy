import {
  AckPolicy,
  DeliverPolicy,
  jetstreamManager,
  ReplayPolicy,
} from "@nats-io/jetstream";
import { catcher, logger } from "./utils/index.js";
import { database } from "./db/client.js";
import { connect } from "@nats-io/transport-node";
import pLimit from "p-limit";

const main = async () => {
  try {
    if (!process.env.POD_NAME) {
      throw new Error("POD_NAME error");
    }

    if (!process.env.POD_TIMEOUT) {
      throw new Error("POD_TIMEOUT error");
    }

    if (!process.env.SERVICE_NAME) {
      throw new Error("SERVICE_NAME error");
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

    if (!process.env.STREAM_LIST) {
      throw new Error("STREAM_LIST error");
    }

    if (!process.env.DURABLE_NAME) {
      throw new Error("DURABLE_NAME error");
    }

    if (!process.env.CONSUMER_GROUP) {
      throw new Error("CONSUMER_GROUP error");
    }

    if (!process.env.CONCURRENT_LIMIT) {
      throw new Error("CONCURRENT_LIMIT error");
    }

    console.log(process.env.POD_NAME);

    const MODU = await import(
      `./handlers/${process.env.SERVICE_NAME}/index.js`
    );

    const errorEvents: string[] = [
      "exit",
      "SIGINT",
      "SIGTERM",
      "SIGQUIT",
      "uncaughtException",
      "unhandledRejection",
    ];

    database.connect({
      host: "mysql",
      port: 3306,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      waitForConnections: true,
      connectionLimit: 150,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      connectTimeout: 30000,
    });

    const natsClient = await connect({
      name: process.env.POD_NAME,
      servers: ["nats:4222"],
      reconnect: true,
      pingInterval: 20 * 1000,
      maxPingOut: 5,
      reconnectTimeWait: 10 * 1000,
    });

    const maxConcurrency = parseInt(process.env.CONCURRENT_LIMIT);

    const limit = pLimit(maxConcurrency);

    const jsm = await jetstreamManager(natsClient, {
      checkAPI: false,
    });

    const jetStream = jsm.jetstream();

    const streamList = process.env.STREAM_LIST.split(",");

    let consumerList: any = {};

    setTimeout(() => {
      console.log("Graceful shutdown completed.");
      process.exit(0);
    }, 120_000);

    streamList.forEach(async (stream) => {
      try {
        //await jsm.consumers.delete(stream, process.env.DURABLE_NAME);

        await jsm.consumers.add(stream, {
          durable_name: process.env.DURABLE_NAME,
          deliver_group: process.env.CONSUMER_GROUP,
          ack_policy: AckPolicy.Explicit,
          deliver_policy: DeliverPolicy.All,
          replay_policy: ReplayPolicy.Instant,
          max_deliver: -1,
        });

        const consumer = await jetStream.consumers.get(
          stream,
          process.env.DURABLE_NAME
        );

        const messages: any = await consumer.consume({
          max_messages: 1,
        });

        consumerList[stream] = messages;

        for await (const message of consumerList[stream]) {
          limit(() => MODU.processEvent(message));
        }
      } catch (err) {
        catcher(err);
      }
    });

    errorEvents.forEach((e: string) =>
      process.on(e, async (err) => {
        console.log("YES", e);

        streamList.forEach(async (stream) => {
          if (stream) {
            consumerList[stream].stop();
            console.log("stream stop", stream);
          }
        });

        await natsClient.drain();
        await natsClient.close();
        await database.client.end();
        catcher(err);
      })
    );

    logger.info("ONLINE");
  } catch (err) {
    catcher(err);
  }
};

main();

//Service
