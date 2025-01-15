import * as dotenv from "dotenv";
import { Kupmios } from "@lucid-evolution/lucid";
import { blueprint } from "./plutus.js";

dotenv.config();

const provider = new Kupmios(
  process.env.KUPO_KEY as string,
  process.env.OGMIOS_KEY as string,
);

type Validators = {
  threadToken: string;
  stateMachine: string;
};

function readValidators(): Validators {
  const threadToken = blueprint.validators.find(
    (v: any) => v.title === "marketplace.threadtoken.mint"
  );

  if (!threadToken) {
    throw new Error("threadToken validator not found");
  }

  const stateMachine = blueprint.validators.find(
    (v: any) => v.title === "marketplace.statemachine.spend"
  );

  if (!stateMachine) {
    throw new Error("stateMachine validator not found");
  }

  return {
    threadToken: threadToken.compiledCode,
    stateMachine: stateMachine.compiledCode,
  };
}


const validators = readValidators();

function serializeParams(array: any[]) {
  return array.join(",");
}

/**
 *
 * @param params
 * @returns {string} threadTokenPolicyId 0
 * @returns {string} sellerPubKeyHash 1
 *  @returns {string} buyerPubKeyHash 2
 *  @returns {string} contractPrice 3
 *  @returns {string} contractCollateral 4
 *  @returns {string} pendingUntil 5
 */
function deserializeParams(params: string) {
  return params.split(",");
}

export {
  provider,
  readValidators,
  validators,
  serializeParams,
  deserializeParams,
};
