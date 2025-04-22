import { customAlphabet } from "nanoid";

export function createId(alphabet: string, length: number): string {
  if (!alphabet || typeof alphabet !== "string") {
    throw new Error("Invalid alphabet");
  }

  if (!Number.isInteger(length) || length <= 0) {
    throw new Error("Length must be a positive integer");
  }

  return customAlphabet(alphabet, length)();
}

export const getSellerId = () =>{
  return createId("0123456789ABCD", 21)
}


export const getProductId = () =>{
  return createId("ACDEHILMOTUVWXY01378", 21)
}

export const getEventId = () =>{
  return createId("abcdefghijklmnopqrstuvwxyz0123456789", 21)
}
