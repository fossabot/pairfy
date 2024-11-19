import {
  AckPolicy,
  DeliverPolicy,
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

    const jetStream = jsm.jetstream();

    const CONSUMER_NAME = "service-gateway";

    const CONSUMER_GROUP = "service-gateway-group";

    const STREAM_NAME = "product";

    await jsm.consumers.add(STREAM_NAME, {
      durable_name: CONSUMER_NAME,
      deliver_group: CONSUMER_GROUP,
      ack_policy: AckPolicy.Explicit,
      deliver_policy: DeliverPolicy.All,
    });

    const consumer = await jetStream.consumers.get(STREAM_NAME, CONSUMER_NAME);

    const messages: any = await consumer.consume({ max_messages: 1 });

    for await (const m of messages) {
      
      const jsonString = new TextDecoder().decode(m.data);

      console.log(jsonString);

      m.ack();
    }

    logger.info("ONLINE");
  } catch (err) {
    catcher(err);
  }
};

main();
