import {
  applyParamsToScript,
  applyDoubleCborEncoding,
  Constr,
  mintingPolicyToId,
  MintingPolicy,
  fromText,
  Data,
  SpendingValidator,
  validatorToAddress,
  paymentCredentialOf,
} from "@lucid-evolution/lucid";
import {
  deserializeParams,
  lucid,
  serializeParams,
  validators,
} from "./index.js";

const NETWORK = "Preprod";

/**Generates a CBOR transaction to be signed and sent in the browser by the buyer to return funds after pending_until. */
async function returnTransactionBuilder(
  externalWalletAddress: string,
  stateMachineAddress: string,
  serializedParams: string,
  validUntil: bigint
) {
  /**
   *
   *  @type {string} threadTokenPolicyId 0
   *  @type {string} sellerPubKeyHash 1
   *  @type {string} buyerPubKeyHash 2
   *  @type {number} contractPrice 3
   *  @type {number} contractCollateral 4
   *  @type {number} pendingUntil 5
   */
  const stateMachineParams = deserializeParams(serializedParams);

  console.log(stateMachineParams);
  //////////////////////////////////////////////////

  const externalWalletUtxos = await lucid.utxosAt(externalWalletAddress);

  lucid.selectWallet.fromAddress(externalWalletAddress, externalWalletUtxos);

  const collateral = 1_000_000;

  const minLovelace = collateral;

  const findIndex = externalWalletUtxos.findIndex(
    (item) => item.assets.lovelace > minLovelace
  );

  const externalWalleUtxo = externalWalletUtxos[findIndex];

  ///////////////////////////////////////////////////

  const datumValues = {
    state: BigInt(-1),
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
      ]
    ),
  };

  ////////////////////////////////////////////

  const returnInput = "Return";

  const StateMachineInput = Data.Enum([
    Data.Literal("Return"),
    Data.Literal("Locking"),
  ]);

  type InputType = Data.Static<typeof StateMachineInput>;

  const InputType = StateMachineInput as unknown as InputType;

  const stateMachineRedeemer = Data.to(returnInput, InputType);

  ///////////////////////////////////////////

  const transaction = await lucid
    .newTx()
    .collectFrom([utxo, externalWalleUtxo], stateMachineRedeemer)
    .pay.ToContract(
      stateMachineAddress,
      {
        kind: "inline",
        value: stateMachineDatum,
      },
      {
        [threadTokenUnit]: 1n,
      }
    )
    .pay.ToAddress(externalWalletAddress, {
      lovelace: BigInt(stateMachineParams[3]),
    })
    .attach.SpendingValidator(stateMachineScript)
    .addSigner(externalWalletAddress)
    .validTo(Number(validUntil))
    .complete({
      changeAddress: externalWalletAddress,
      setCollateral: 1_000_000n,
      coinSelection: false,
      localUPLCEval: false,
    });

  const cbor = transaction.toCBOR();

  console.log("CBOR---------------------------------------");

  console.log("Unit: ", threadTokenUnit);

  console.log("stateMachineAddress: ", stateMachineAddress);

  console.log("CBOR---------------------------------------");

  console.log(cbor);

  return {
    cbor,
  };
}

function main() {
  const now = Date.now();

  const TX_VALID_TIME = 5;

  const validUntil = now + TX_VALID_TIME * 60 * 1000;

  const externalWalletAddress =
    "addr_test1qz3rnekzh0t2nueyn4j6lmufc28pgu0dqlzjnmqxsjxvzs24qtjuxnphyqxz46t40nudnm3kxu8hkau2mq6nw7svg7jswruwy3";

  const stateMachineAddress =
    "addr_test1wp4qrqj2xc0yyh6gs4vvhcuqpwpnyy5rwe7dshtnmase5ps87s5rx";

  const serializedParams =
    "45bfd02834b096c3b94bba60c53269607c7f012b74bade59a8cdf6cc,659fa0cf862b8460989af5f1200118a910ca04ae31b65aaa767d2b65,a239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc141,30000000,10000000,1734062927220";

  returnTransactionBuilder(
    externalWalletAddress,
    stateMachineAddress,
    serializedParams,
    BigInt(validUntil)
  );
}

main();

export { returnTransactionBuilder };

//two signature, collateral, validto, paramterice price, collateral, seller, buyer
