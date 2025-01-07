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
  metadata: any
) {
  //////////////////////////////////////////////////

  const now = Date.now();

  const txValidTime = parseInt(process.env.TX_VALID_TIME as string);

  const txWatchWindow = parseInt(process.env.TX_WATCH_WINDOW as string);

  const pendingRange = parseInt(process.env.PENDING_RANGE as string);

  const shippingRange = parseInt(process.env.SHIPPING_RANGE as string);

  const expiringRange = 5259600000;
  //////////////////////////////////////////////////

  const validToMs = BigInt(now + txValidTime);

  const watchUntil = BigInt(now + txValidTime + txWatchWindow);

  const pendingUntil = BigInt(now + txValidTime + txWatchWindow + pendingRange);

  const shippingUntil = BigInt(
    now + txValidTime + txWatchWindow + pendingRange + shippingRange
  );

  const expireUntil = BigInt(
    now +
      txValidTime +
      txWatchWindow +
      pendingRange +
      shippingRange +
      expiringRange
  );

  //////////////////////////////////////////////////

  const externalWalletUtxos = await lucid.utxosAt(externalWalletAddress);

  lucid.selectWallet.fromAddress(externalWalletAddress, externalWalletUtxos);

  const buyerPubKeyHash = paymentCredentialOf(externalWalletAddress).hash;

  //////////////////////////////////////////////////

  const txCollateral = 5_000_000n;

  const minLovelace =
    contractPrice < txCollateral ? txCollateral : contractPrice;

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
      [tokenName, utxoRef, validToMs]
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
    shippingUntil,
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
    .validTo(Number(validToMs))
    .attachMetadata(77, metadata)
    .complete({
      changeAddress: externalWalletAddress,
      setCollateral: txCollateral,
      coinSelection: false,
      localUPLCEval: false,
    });

  const cbor = transaction.toCBOR();

  return {
    threadTokenPolicyId,
    stateMachineAddress,
    serializedParams,
    assetUnit,
    cbor,
    watchUntil,
    pendingUntil,
    shippingUntil,
    expireUntil
  };
}

async function main() {
  const externalWalletAddress =
    "addr_test1qp6xhlulkdnm7wa3kf07yj389weg34329jk34tfwx75pw0urvzxsjpchzgnhfmvz35ap356vg3a2c2af34zl4va7cfzqtyf6jn";

  const sellerPubKeyHash =
    "a239e6c2bbd6a9f3249d65afef89c28e1471ed07c529ec06848cc141";

  const contractPrice = 30 * 1_000_000;

  const contractCollateral = 10 * 1_000_000;

  const metadata = { msg: "what" };

  const BUILDER = await pendingTransactionBuilder(
    externalWalletAddress,
    sellerPubKeyHash,
    BigInt(contractPrice),
    BigInt(contractCollateral),
    metadata
  );

  console.log("--------------------------------------------------------");

  console.log("ThreadToken: ", BUILDER.threadTokenPolicyId);

  console.log("Unit: ", BUILDER.assetUnit);

  console.log("stateMachineAddress: ", BUILDER.stateMachineAddress);

  console.log("stateMachineParams: ", BUILDER.serializedParams);

  console.log("--------------------------------------------------------");

  console.log(BUILDER.cbor);
}

//main();

export { pendingTransactionBuilder };

//two signature, collateral, validto, paramterice price, collateral, seller, buyer
