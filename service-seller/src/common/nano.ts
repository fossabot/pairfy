import { customAlphabet } from "nanoid";

const getSellerId = customAlphabet("0123456789", 18);

const getEventId = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 21);

const createId = (alphabet: string, length: number): string => {
    if (!alphabet || typeof alphabet !== 'string') {
      throw new Error("Invalid alphabet");
    }
  
    if (!Number.isInteger(length) || length <= 0) {
      throw new Error("Length must be a positive integer");
    }
  
    return customAlphabet(alphabet, length)();
  };

export { getSellerId, getEventId, createId };
