const createProduct = (message: any, payload: any) => {
  message.ack();

  console.log("createProducted in sevice-query");
};

const handlers: any = {
  CreateProduct: (message: any, payload: any) =>
    createProduct(message, payload),
};

export const processEvent = async (message: any) => {
  const messageDecoded = new TextDecoder().decode(message.data);

  const payload = JSON.parse(messageDecoded);

  console.log(payload.id, payload.event_type);

  await handlers[payload.event_type](message, payload);
};
