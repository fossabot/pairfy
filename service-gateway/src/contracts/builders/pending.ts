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
import { lucid, provider, readValidators } from "./index.js";

const NETWORK = "Preprod";

/////////////// ARGS

const externalWalletAddress =
  "addr_test1qz3rnekzh0t2nueyn4j6lmufc28pgu0dqlzjnmqxsjxvzs24qtjuxnphyqxz46t40nudnm3kxu8hkau2mq6nw7svg7jswruwy3";

const productPrice = 50n * 1_000_000n;

const productCollateral = 25n * 1_000_000n;

//////////////////////////

const externalWalletUtxos = await lucid.utxosAt(externalWalletAddress);

lucid.selectWallet.fromAddress(externalWalletAddress, externalWalletUtxos);

////////////////////////////////
const minLovelace = productPrice;

const findIndex = externalWalletUtxos.findIndex(
  (item) => item.assets.lovelace > minLovelace
);

const utxo = externalWalletUtxos[findIndex];

console.log(utxo);

const utxoRef = new Constr(0, [String(utxo.txHash), BigInt(utxo.outputIndex)]);

const tokenName = fromText("threadtoken");

const validators = readValidators();

const threadToken: MintingPolicy = {
  type: "PlutusV3",
  script: applyParamsToScript(applyDoubleCborEncoding(validators.threadToken), [
    tokenName,
    utxoRef,
  ]),
};

const threadTokenPolicyId = mintingPolicyToId(threadToken);

const mintRedeemer = Data.to(new Constr(0, []));

///////////////////////////////////////

const stateMachine: SpendingValidator = {
  type: "PlutusV3",
  script: applyParamsToScript(applyDoubleCborEncoding(validators.stateMachine), [
    threadTokenPolicyId,
  ]),
};

///////////////////////

const ACCEPT_RANGE = 15; // env minutes

const acceptRange = BigInt(Date.now()) + BigInt(ACCEPT_RANGE * 60 * 1000);
////////////////////////////////////////////
const datumValues = {
  state: BigInt(0),
  buyer: paymentCredentialOf(externalWalletAddress).hash,
  seller: "402873136060f656b8082c797aa805ec870a78b59d5202a35d2024bd",
  price: productPrice,
  collateral: productCollateral,
  accept_range: acceptRange
};

const StateMachineDatum = Data.Object({
  state: Data.Integer(),
  buyer: Data.Bytes(),
  seller: Data.Bytes(),
  price: Data.Integer(),
  collateral: Data.Integer(),
  accept_range: Data.Integer()
});

type DatumType = Data.Static<typeof StateMachineDatum>;

const DatumType = StateMachineDatum as unknown as DatumType;

const stateMachineDatum = Data.to(datumValues, DatumType);

const stateMachineAddress = validatorToAddress(NETWORK, stateMachine);
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
  .attach.MintingPolicy(threadToken)
  .complete({
    changeAddress: externalWalletAddress,
    coinSelection: false,
    localUPLCEval: false,
  });

const tx = transaction.toCBOR();

console.log("ThreadToken", threadTokenPolicyId);

console.log("CBOR:--->   ", tx);
