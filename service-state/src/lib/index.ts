import { axiosAPI } from "../axios/index.js";
import {
  Blockfrost,
  Data,
  fromText,
  Lucid,
  UTxO,
} from "@lucid-evolution/lucid";

const StateMachineDatum = Data.Object({
  state: Data.Integer(),
});

type DatumType = Data.Static<typeof StateMachineDatum>;

const DatumType = StateMachineDatum as unknown as DatumType;

const provider = new Blockfrost(
  "https://cardano-preprod.blockfrost.io/api/v0",
  process.env.PROJECT_ID
);

const lucid = await Lucid(provider, "Preprod");

async function getUtxo(threadtoken: string) {
  let result = null;

  try {
    const unit = threadtoken + fromText("threadtoken");

    const utxo = await lucid.utxoByUnit(unit);

    if (utxo.datum) {
      let response: any = await axiosAPI.get(`/txs/${utxo.txHash}`);

      if (response.status === 200) {
        const data = Data.from(utxo.datum, StateMachineDatum);

        result = {
          ...utxo,
          block_time: response.data.block_time,
          data,
        };
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    return result;
  }
}

export { StateMachineDatum, lucid, getUtxo };
