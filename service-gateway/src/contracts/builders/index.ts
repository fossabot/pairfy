import * as dotenv from 'dotenv';
import blueprint from "../plutus.json" assert { type: "json" };
import { Blockfrost } from "@lucid-evolution/lucid";

dotenv.config();

const provider = new Blockfrost(
  "https://cardano-preprod.blockfrost.io/api/v0",
  process.env.PROJECT_ID
);


type Validators = {
  threadToken: string;
};

function readValidators(): Validators {
  const threadToken = blueprint.validators.find(
    (v) => v.title === "marketplace.threadtoken.mint"
  );

  if (!threadToken) {
    throw new Error("validator not found");
  }

  return {
    threadToken: threadToken.compiledCode,
  };
}

export { provider, readValidators };
