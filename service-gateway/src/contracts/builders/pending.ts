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
import { lucid, serializeParams, validators } from "./index.js";

const NETWORK = "Preprod";

/**Generates a CBOR transaction to be signed and sent in the browser by the buyer. */
async function pendingTransactionBuilder(
  externalWalletAddress: string,
  sellerPubKeyHash: string,
  contractPrice: bigint,
  contractCollateral: bigint,
  validUntil: bigint,
  pendingUntil: bigint,
  shippingUntil: bigint
) {
  const externalWalletUtxos = await lucid.utxosAt(externalWalletAddress);

  lucid.selectWallet.fromAddress(externalWalletAddress, externalWalletUtxos);

  const buyerPubKeyHash = paymentCredentialOf(externalWalletAddress).hash;

  //////////////////////////////////////////////////

  const minLovelace = contractPrice;

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
      [tokenName, utxoRef, validUntil]
    ),
  };

  const threadTokenPolicyId = mintingPolicyToId(threadTokenScript);

  const mintRedeemer = Data.to(new Constr(0, []));

  ///////////////////////////////////////
  const stateMachineParams = [
    threadTokenPolicyId,
    sellerPubKeyHash,
    buyerPubKeyHash,
    contractPrice,
    contractCollateral,
    pendingUntil,
  ];

  const serializedParams = serializeParams(stateMachineParams);

  const stateMachineScript: SpendingValidator = {
    type: "PlutusV3",
    script: applyParamsToScript(
      applyDoubleCborEncoding(validators.stateMachine),
      stateMachineParams
    ),
  };

  ////////////////////////////////////////////

  const datumValues = {
    state: BigInt(0),
  };

  const StateMachineDatum = Data.Object({
    state: Data.Integer(),
  });

  type DatumType = Data.Static<typeof StateMachineDatum>;

  const DatumType = StateMachineDatum as unknown as DatumType;

  const stateMachineDatum = Data.to(datumValues, DatumType);

  const stateMachineAddress = validatorToAddress(NETWORK, stateMachineScript);

  ////////////////////////////////////////////

  const assetUnit = threadTokenPolicyId + tokenName;

  const transaction = await lucid
    .newTx()
    .collectFrom([utxo])
    .mintAssets(
      {
        [assetUnit]: 1n,
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
        [assetUnit]: 1n,
        lovelace: contractPrice,
      }
    )
    .attach.MintingPolicy(threadTokenScript)
    .addSigner(externalWalletAddress)
    .validTo(Number(validUntil))
    .complete({
      changeAddress: externalWalletAddress,
      setCollateral: 1_000_000n,
      coinSelection: false,
      localUPLCEval: false,
    });

  const cbor = transaction.toCBOR();

  console.log("--------------------------------------------------------");

  console.log("ThreadToken: ", threadTokenPolicyId);

  console.log("Unit: ", assetUnit);

  console.log("stateMachineAddress: ", stateMachineAddress);

  console.log("stateMachineParams: ", serializedParams);

  console.log("--------------------------------------------------------");

  console.log(cbor);

  return {
    threadTokenPolicyId,
    stateMachineAddress,
    serializedParams,
    cbor,
  };
}

function main() {
  const now = Date.now();

  const TX_VALID_TIME = 5; //tx valid until

  const WATCH_TX_WINDOW = 15; //Observation window limit for the detection of the first transaction

  const PENDING_UNTIL = 16; // 15minutes for the seller to accept;

  const SHIPPING_UNTIL = 1440; // 24h to shipping;

  ///////////////////////////////////////////////

  const validUntil = now + TX_VALID_TIME * 60 * 1000;

  const pendingUntil =
    now + (TX_VALID_TIME + WATCH_TX_WINDOW + PENDING_UNTIL * 60 * 1000);

  const shippingUntil =
    now +
    (TX_VALID_TIME +
      WATCH_TX_WINDOW +
      PENDING_UNTIL +
      SHIPPING_UNTIL * 60 * 1000);

  const externalWalletAddress =
    "addr_test1qp6xhlulkdnm7wa3kf07yj389weg34329jk34tfwx75pw0urvzxsjpchzgnhfmvz35ap356vg3a2c2af34zl4va7cfzqtyf6jn";

  const sellerPubKeyHash =
    "a239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc141";

  const contractPrice = 30 * 1_000_000;

  const contractCollateral = 10 * 1_000_000;

  pendingTransactionBuilder(
    externalWalletAddress,
    sellerPubKeyHash,
    BigInt(contractPrice),
    BigInt(contractCollateral),
    BigInt(validUntil),
    BigInt(pendingUntil),
    BigInt(shippingUntil)
  );
}

//main();

export { pendingTransactionBuilder };

//two signature, collateral, validto, paramterice price, collateral, seller, buyer
