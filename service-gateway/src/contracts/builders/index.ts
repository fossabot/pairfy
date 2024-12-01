import * as dotenv from 'dotenv';
import blueprint from "../plutus.json" assert { type: "json" };
import { Blockfrost, Lucid } from "@lucid-evolution/lucid";

dotenv.config();

const provider = new Blockfrost(
  "https://cardano-preprod.blockfrost.io/api/v0",
  process.env.PROJECT_ID
);


type Validators = {
  threadToken: string;
  stateMachine: string;
};

function readValidators(): Validators {
  const threadToken = blueprint.validators.find(
    (v) => v.title === "marketplace.threadtoken.mint"
  );

  if (!threadToken) {
    throw new Error("threadToken validator not found");
  }

  const stateMachine = blueprint.validators.find(
    (v) => v.title === "marketplace.statemachine.spend"
  );

  if (!stateMachine) {
    throw new Error("stateMachine validator not found");
  }

  return {
    threadToken: threadToken.compiledCode,
    stateMachine: stateMachine.compiledCode,
  };
}

const lucid = await Lucid(provider, "Preprod");

export { provider, readValidators, lucid };
