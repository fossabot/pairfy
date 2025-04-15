import { customAlphabet } from "nanoid";

const getSellerId = customAlphabet("0123456789", 18);



const getEventId = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 21);

export { getSellerId, getEventId};
