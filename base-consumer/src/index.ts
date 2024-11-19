import { AckPolicy, DeliverPolicy, jetstreamManager } from "@nats-io/jetstream";
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

    if (!process.env.CONSUMER_GROUP) {
      throw new Error("CONSUMER_GROUP error");
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

    const jetStream = jsm.jetstream();

    const streamList = process.env.STREAM_LIST.split(",");

    for (const stream of streamList) {
      await jsm.consumers
        .add(stream, {
          durable_name: process.env.POD_NAME,
          deliver_group: process.env.CONSUMER_GROUP,
          ack_policy: AckPolicy.Explicit,
          deliver_policy: DeliverPolicy.All,
        })
        .then((res) => console.log(res))
        .catch((err) => logger.error(err));

      const consumer = await jetStream.consumers.get(
        stream,
        process.env.POD_NAME
      );

      const messages: any = await consumer.consume({ max_messages: 1 });

      for await (const message of messages) {
        console.log(process.env.POD_NAME);
        MODU.processEvent(message);
      }
    }

    logger.info("ONLINE");
  } catch (err) {
    catcher(err);
  }
};

main();

//Service
