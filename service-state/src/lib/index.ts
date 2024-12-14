import { logger } from "../utils/index.js";
import { axiosAPI } from "../axios/index.js";
import { Data, fromText, Koios, Lucid } from "@lucid-evolution/lucid";

const provider = new Koios("https://preprod.koios.rest/api/v1");

const lucid = await Lucid(provider, "Preprod");

const StateMachineDatum = Data.Object({
  state: Data.Integer(),
});

type DatumType = Data.Static<typeof StateMachineDatum>;

const DatumType = StateMachineDatum as unknown as DatumType;

interface ResponseType {
  code: number;
  utxo: any;
}

async function getUtxo(threadtoken: string): Promise<ResponseType> {
  let result = {
    code: 0,
    utxo: {},
  };

  try {
    const unit = threadtoken + fromText("threadtoken");

    const utxo = await lucid.utxoByUnit(unit);

    if (utxo.datum) {
      let query: any = await axiosAPI.get(`/txs/${utxo.txHash}`);

      if (query.status === 200) {
        const data = Data.from(utxo.datum, StateMachineDatum);

        const payload = {
          ...utxo,
          block_time: query.data.block_time,
          data,
        };

        result = {
          code: 200,
          utxo: payload,
        };
      }
    }
  } catch (err: any) {
    if (err.message === "Error: Unit not found") {
      result = {
        code: 404,
        utxo: {},
      };
    } else {
      logger.error(err);
    }
  } finally {
    return result;
  }
}

export { StateMachineDatum, lucid, getUtxo };
