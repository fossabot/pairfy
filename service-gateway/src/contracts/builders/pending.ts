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

const PENDING_UNTIL = 15; // env minutes

/**Generates a CBOR transaction to be signed and sent in the browser by the buyer. */
async function pendingTransactionBuilder(
  externalWalletAddress: string,
  sellerPubKeyHash: string,
  contractPrice: bigint,
  contractCollateral: bigint
) {
  const externalWalletUtxos = await lucid.utxosAt(externalWalletAddress);

  lucid.selectWallet.fromAddress(externalWalletAddress, externalWalletUtxos);

  const buyerPubKeyHash = paymentCredentialOf(externalWalletAddress).hash;
  ////////////////////////////////
  const minLovelace = contractPrice; //fee

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
      [
        threadTokenPolicyId,
        sellerPubKeyHash,
        buyerPubKeyHash,
        contractPrice,
        contractCollateral,
      ]
    ),
  };

  //////////////////////////////////
 
  const pendingUntil = BigInt(Date.now() + PENDING_UNTIL * 60 * 1000);
  ////////////////////////////////////////////
  const datumValues = {
    state: BigInt(0),
    pending_until: pendingUntil,
  };

  const StateMachineDatum = Data.Object({
    state: Data.Integer(),
    pending_until: Data.Integer(),
  });

  type DatumType = Data.Static<typeof StateMachineDatum>;

  const DatumType = StateMachineDatum as unknown as DatumType;

  const stateMachineDatum = Data.to(datumValues, DatumType);

  const stateMachineAddress = validatorToAddress(NETWORK, stateMachineScript);

  ////////////////////////////////////////////

  const assetName = threadTokenPolicyId + tokenName;

  const transaction = await lucid
    .newTx()
    .collectFrom([utxo])
    .mintAssets(
      {
        [assetName]: 1n,
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
        [assetName]: 1n,
        lovelace: contractPrice,
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

  console.log("CBOR---------------------------------------");

  console.log(cbor);

  return {
    threadTokenPolicyId,
    assetName,
    stateMachineAddress,
    cbor,
  };
}

function main() {
  const externalWalletAddress =
    "addr_test1qz3rnekzh0t2nueyn4j6lmufc28pgu0dqlzjnmqxsjxvzs24qtjuxnphyqxz46t40nudnm3kxu8hkau2mq6nw7svg7jswruwy3";

  const contractPrice = 30n * 1_000_000n;

  const contractCollateral = 10n * 1_000_000n;

  const sellerPubKeyHash =
    "659fa0cf862b8460989af5f1200118a910ca04ae31b65aaa767d2b65";

  pendingTransactionBuilder(
    externalWalletAddress,
    sellerPubKeyHash,
    contractPrice,
    contractCollateral
  );
}

main();

export { pendingTransactionBuilder };

//two signature, collateral, validAfter, paramterice price, collateral, seller, buyer
