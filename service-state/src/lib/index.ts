import { logger } from "../utils/index.js";
import { axiosAPI } from "../axios/index.js";
import { Data, fromText, Kupmios, Lucid } from "@lucid-evolution/lucid";

const provider = new Kupmios(
  process.env.KUPO_KEY as string,
  process.env.OGMIOS_KEY as string
);

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

    if (!utxo) {
      result = {
        code: 404,
        utxo: {},
      };
    } else {
      let txInfo: any = await axiosAPI.get(`/txs/${utxo.txHash}`);

      if (txInfo.status === 200) {
        const data = Data.from(utxo.datum!, StateMachineDatum);

        const metadata = await axiosAPI.get(`/txs/${utxo.txHash}/metadata`);

        console.log(metadata.data);

        const payload = {
          ...utxo,
          block_time: txInfo.data.block_time,
          data,
        };

        result = {
          code: 200,
          utxo: payload,
        };
      }
    }
  } catch (err: any) {
    logger.error(err);
  } finally {
    return result;
  }
}

export { StateMachineDatum, lucid, getUtxo };
