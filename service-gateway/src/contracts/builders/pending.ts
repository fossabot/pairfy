import {
  Lucid,
  Blockfrost,
  applyParamsToScript,
  applyDoubleCborEncoding,
  Constr,
  mintingPolicyToId,
  MintingPolicy,
  fromText,
  Data,
} from "@lucid-evolution/lucid";
import { provider, readValidators } from "./index.js";

const lucid = await Lucid(provider, "Preprod");

const externalWalletAddress =
  "addr_test1qz3rnekzh0t2nueyn4j6lmufc28pgu0dqlzjnmqxsjxvzs24qtjuxnphyqxz46t40nudnm3kxu8hkau2mq6nw7svg7jswruwy3";

const externalWalletUtxos = await lucid.utxosAt(externalWalletAddress);

lucid.selectWallet.fromAddress(externalWalletAddress, externalWalletUtxos);

///////////////
const findIndex = externalWalletUtxos.findIndex(item => item.assets.lovelace > 1000000n)

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

const transaction = await lucid
  .newTx()
  .collectFrom([utxo])
  .mintAssets(
    {
      [threadTokenPolicyId + tokenName]: 1n,
    },
    mintRedeemer
  )
  .pay.ToAddress(externalWalletAddress, {
    [threadTokenPolicyId + tokenName]: 1n,
    lovelace: 1000000n
  })
  .attach.MintingPolicy(threadToken)
  .complete({
    changeAddress: externalWalletAddress,
    coinSelection: false,
    localUPLCEval: false
  });

const tx = transaction.toCBOR();


console.log("ThreadToken", threadTokenPolicyId);

console.log("CBOR", tx);
