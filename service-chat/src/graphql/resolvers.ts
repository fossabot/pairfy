import crypto from 'crypto';

const getMessages = async (_: any, args: any, context: any) => {
  const params = args.getMessagesInput;

  try {
    console.log("body");

    return crypto.randomBytes(16).toString('hex');
  } catch (err: any) {

    throw new Error(err.message);
  } 
};

const updateMessage = async (_: any, args: any, context: any) => {
  const params = args.updateMessageInput;

  try {
    console.log("body");
    return crypto.randomBytes(16).toString('hex');
  } catch (err: any) {

    throw new Error(err.message);
  } 
};

const messages = {
  Query: {
    getMessages,
  },
  Mutation: {
    updateMessage,
  },
};

export { messages };
