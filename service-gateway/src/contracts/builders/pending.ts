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
import { lucid, validators } from "./index.js";

const NETWORK = "Preprod";

const ACCEPT_RANGE = 15; // env minutes

/**Generates a CBOR transaction to be signed and sent in the browser by the buyer. */
async function pendingTransactionBuilder(
  externalWalletAddress: string,
  sellerPubKeyHash: string,
  productPrice: bigint,
  productCollateral: bigint
) {
  const externalWalletUtxos = await lucid.utxosAt(externalWalletAddress);

  lucid.selectWallet.fromAddress(externalWalletAddress, externalWalletUtxos);

  ////////////////////////////////
  const minLovelace = productPrice;  //fee 

  const findIndex = externalWalletUtxos.findIndex(
    (item) => item.assets.lovelace > minLovelace
  );

  const utxo = externalWalletUtxos[findIndex];

  const utxoRef = new Constr(0, [
    String(utxo.txHash),
    BigInt(utxo.outputIndex),
  ]);

  const tokenName = fromText("threadtoken");

  const threadTokenScript: MintingPolicy = {
    type: "PlutusV3",
    script: applyParamsToScript(
      applyDoubleCborEncoding(validators.threadToken),
      [tokenName, utxoRef]
    ),
  };

  const threadTokenPolicyId = mintingPolicyToId(threadTokenScript);

  const mintRedeemer = Data.to(new Constr(0, []));

  ///////////////////////////////////////

  const stateMachineScript: SpendingValidator = {
    type: "PlutusV3",
    script: applyParamsToScript(
      applyDoubleCborEncoding(validators.stateMachine),
      [threadTokenPolicyId]
    ),
  };

  //////////////////////////////////
  const acceptPOSIX = Date.now() + ACCEPT_RANGE * 60 * 1000;
  const acceptRange = BigInt(acceptPOSIX);
  ////////////////////////////////////////////
  const datumValues = {
    state: BigInt(0),
    buyer: paymentCredentialOf(externalWalletAddress).hash,
    seller: sellerPubKeyHash,
    price: productPrice,
    collateral: productCollateral,
    accept_range: acceptRange,
  };

  const StateMachineDatum = Data.Object({
    state: Data.Integer(),
    buyer: Data.Bytes(),
    seller: Data.Bytes(),
    price: Data.Integer(),
    collateral: Data.Integer(),
    accept_range: Data.Integer(),
  });

  type DatumType = Data.Static<typeof StateMachineDatum>;

  const DatumType = StateMachineDatum as unknown as DatumType;

  const stateMachineDatum = Data.to(datumValues, DatumType);

  const stateMachineAddress = validatorToAddress(NETWORK, stateMachineScript);

  ////////////////////////////////////////////

  const transaction = await lucid
    .newTx()
    .collectFrom([utxo])
    .mintAssets(
      {
        [threadTokenPolicyId + tokenName]: 1n,
      },
      mintRedeemer
    )
    .pay.ToAddressWithData(
      stateMachineAddress,
      {
        kind: "inline",
        value: stateMachineDatum,
      },
      {
        [threadTokenPolicyId + tokenName]: 1n,
        lovelace: productPrice,
      }
    )
    .attach.MintingPolicy(threadTokenScript)
    .complete({
      changeAddress: externalWalletAddress,
      coinSelection: false,
      localUPLCEval: false,
    });

  const cbor = transaction.toCBOR();

  console.log("ThreadToken: ", threadTokenPolicyId);

  console.log("stateMachineAddress: ", stateMachineAddress);

  console.log("CBOR------------");

  console.log(cbor);

  return {
    threadTokenPolicyId,
    stateMachineAddress,
    cbor,
  };
}

const externalWalletAddress =
  "addr_test1qz3rnekzh0t2nueyn4j6lmufc28pgu0dqlzjnmqxsjxvzs24qtjuxnphyqxz46t40nudnm3kxu8hkau2mq6nw7svg7jswruwy3";

const productPrice = 50n * 1_000_000n;

const productCollateral = 25n * 1_000_000n;

const sellerPubKeyHash =
  "402873136060f656b8082c797aa805ec870a78b59d5202a35d2024bd";

pendingTransactionBuilder(
  externalWalletAddress,
  sellerPubKeyHash,
  productPrice,
  productCollateral,
);

export { pendingTransactionBuilder };

//two signature, collateral, validAfter
