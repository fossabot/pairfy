import {
  applyParamsToScript,
  applyDoubleCborEncoding,
  fromText,
  Data,
  SpendingValidator,
  validatorToAddress,
} from "@lucid-evolution/lucid";
import { deserializeParams, lucid, validators } from "./index.js";

const NETWORK = "Preprod";

/**Generates a CBOR transaction to be signed and sent in the browser by the seller to take the order before pending_until. */
async function lockingTransactionBuilder(
  externalWalletAddress: string,
  serializedParams: string
) {
  //////////////////////////////////////////////////

  const now = Date.now();

  const txValidTime = parseInt(process.env.TX_VALID_TIME as string);

  const validToMs = BigInt(now + txValidTime);

  //////////////////////////////////////////////////
  /**
   *
   *  @type {string} threadTokenPolicyId 0
   *  @type {string} sellerPubKeyHash 1
   *  @type {string} buyerPubKeyHash 2
   *  @type {number} contractPrice 3
   *  @type {number} contractCollateral 4
   *  @type {number} pendingUntil 5
   *  @type {number} shippingUntil 6
   */
  const stateMachineParams = deserializeParams(serializedParams);

  //////////////////////////////////////////////////

  const externalWalletUtxos = await lucid.utxosAt(externalWalletAddress);

  lucid.selectWallet.fromAddress(externalWalletAddress, externalWalletUtxos);

  const txCollateral = 5_000_000n;

  const productCollateral = BigInt(stateMachineParams[4]);

  const minLovelace =
    productCollateral < txCollateral ? txCollateral : productCollateral;

  const findIndex = externalWalletUtxos.findIndex(
    (item) => item.assets.lovelace > minLovelace
  );

  const externalWalletUtxo = externalWalletUtxos[findIndex];

  ///////////////////////////////////////////////////

  const datumValues = {
    state: BigInt(1),
  };

  const StateMachineDatum = Data.Object({
    state: Data.Integer(),
  });

  type DatumType = Data.Static<typeof StateMachineDatum>;

  const DatumType = StateMachineDatum as unknown as DatumType;

  const stateMachineDatum = Data.to(datumValues, DatumType);

  //////////////////////////////////////////////////

  const threadTokenUnit = stateMachineParams[0] + fromText("threadtoken");

  const utxo = await lucid.utxoByUnit(threadTokenUnit);

  console.log(utxo);

  if (utxo.datum) {
    const data = Data.from(utxo.datum, StateMachineDatum);

    console.log(data);

    if (data.state !== 0n) {
      throw new Error("WRONG_STATE");
    }
  }

  ///////////////////////////////////////

  const stateMachineScript: SpendingValidator = {
    type: "PlutusV3",
    script: applyParamsToScript(
      applyDoubleCborEncoding(validators.stateMachine),
      [
        stateMachineParams[0],
        stateMachineParams[1],
        stateMachineParams[2],
        BigInt(stateMachineParams[3]),
        BigInt(stateMachineParams[4]),
        BigInt(stateMachineParams[5]),
        BigInt(stateMachineParams[6]),
      ]
    ),
  };

  const stateMachineAddress = validatorToAddress(NETWORK, stateMachineScript);

  console.log(stateMachineAddress);

  ////////////////////////////////////////////

  const returnInput = "Locking";

  const StateMachineInput = Data.Enum([
    Data.Literal("Return"),
    Data.Literal("Locking"),
    Data.Literal("Shipping"),
  ]);

  type InputType = Data.Static<typeof StateMachineInput>;

  const InputType = StateMachineInput as unknown as InputType;

  const stateMachineRedeemer = Data.to(returnInput, InputType);

  ///////////////////////////////////////////

  const lovelaceToSM =
    BigInt(stateMachineParams[3]) + BigInt(stateMachineParams[4]);

  console.log(lovelaceToSM);

  const transaction = await lucid
    .newTx()
    .collectFrom([utxo], stateMachineRedeemer)
    .collectFrom([externalWalletUtxo])
    .pay.ToAddressWithData(
      stateMachineAddress,
      {
        kind: "inline",
        value: stateMachineDatum,
      },
      {
        [threadTokenUnit]: 1n,
        lovelace: lovelaceToSM,
      }
    )
    .attach.SpendingValidator(stateMachineScript)
    .addSigner(externalWalletAddress)
    .validFrom(Date.now())
    .validTo(Number(validToMs))
    .complete({
      changeAddress: externalWalletAddress,
      setCollateral: txCollateral,
      coinSelection: false,
      localUPLCEval: false,
    });

  const cbor = transaction.toCBOR();

  return {
    threadTokenUnit,
    stateMachineAddress,
    cbor,
  };
}

async function main() {
  const externalWalletAddress =
    "addr_test1qz3rnekzh0t2nueyn4j6lmufc28pgu0dqlzjnmqxsjxvzs24qtjuxnphyqxz46t40nudnm3kxu8hkau2mq6nw7svg7jswruwy3";

  const serializedParams =
    "0a09d13dacc36caa75855765930e3f93f840f7e07ea72b05fe31ece2,a239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc141,746bff9fb367bf3bb1b25fe24a272bb288d62a2cad1aad2e37a8173f,30000000,10000000,1734559401711";

  const BUILDER = await lockingTransactionBuilder(
    externalWalletAddress,
    serializedParams
  );

  console.log("CBOR---------------------------------------");

  console.log("Unit: ", BUILDER.threadTokenUnit);

  console.log("stateMachineAddress: ", BUILDER.stateMachineAddress);

  console.log("CBOR---------------------------------------");

  console.log(BUILDER.cbor);
}

//main();

export { lockingTransactionBuilder };

//two signature, collateral, validto, paramterice price, collateral, seller, buyer
