import crypto from "crypto";
import { SellerToken, UserToken } from "@/middleware/agent.js";
import { getMessageId } from "../utils/index.js";

const getMessages = async (_: any, args: any, context: any) => {
  try {
    const params = args.getMessagesInput;

    const USER = context.userData as UserToken;

    const SELLER = context.sellerData as SellerToken;

    const SESSION = params.session.split(":");

    let chatKey = "";

    if (USER) {
      chatKey = `chat:${SESSION[0]}:${USER.pubkeyhash}:${SESSION[2]}`;
    }

    if (SELLER) {
      chatKey = `chat:${SESSION[0]}:${SESSION[1]}:${SELLER.id}`;
    }

    const messages = await context.redisClient.zRange(chatKey, 0, -1);

    return messages.map(JSON.parse);
  } catch (err: any) {
    throw new Error(err.message);
  }
};
const updateMessage = async (_: any, args: any, context: any) => {
  try {
    console.log("body");

    return crypto.randomBytes(16).toString("hex");
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const createMessage = async (_: any, args: any, context: any) => {
  try {
    const params = args.createMessageInput;

    const USER = context.userData as UserToken;

    const SELLER = context.sellerData as SellerToken;

    const SESSION = params.session.split(":");

    let chatKey = "";

    let message = {
      id: getMessageId(),
      agent: "",
      role: "",
      content: params.content,
      seen: false,
      created_at: Date.now(),
    };

    if (USER) {
      message.agent = USER.pubkeyhash;
      message.role = "buyer";
      chatKey = `chat:${SESSION[0]}:${message.agent}:${SESSION[2]}`;
    }

    if (SELLER) {
      message.agent = SELLER.id;
      message.role = "seller";
      chatKey = `chat:${SESSION[0]}:${SESSION[1]}:${message.agent}`;
    }

    await context.redisClient.zAdd(chatKey, {
      score: Date.now(),
      value: JSON.stringify(message),
    });

    const channel = `chat:${SESSION[0]}:${message.agent}`;

    console.log(channel);

    console.log(message);

    await context.pubsub.publish(channel, { newMessages: message });

    return {
      success: true,
    };
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const messages = {
  Query: {
    getMessages,
  },
  Mutation: {
    createMessage,
    updateMessage,
  },
};

export { messages };
