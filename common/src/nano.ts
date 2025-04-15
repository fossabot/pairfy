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
