import {
  MetadataArray,
  GetTxInfoResponse,
  StateMachineDatum,
  TransactionSchema,
  UtxoResponse,
} from "./types.js";
import { logger } from "../utils/index.js";
import { blockFrostAPI, axios } from "../api/index.js";
import { Data, fromText, Kupmios, Lucid, UTxO } from "@lucid-evolution/lucid";

const provider = new Kupmios(
  process.env.KUPO_KEY as string,
  process.env.OGMIOS_KEY as string
);

const lucid = await Lucid(provider, "Preprod");

//////////////////////////////////////////////

async function getTxInfo(utxo: UTxO): Promise<GetTxInfoResponse> {
  try {
    const [R1, R2] = await axios.all([
      blockFrostAPI.get(`/txs/${utxo.txHash}`),
      blockFrostAPI.get(`/txs/${utxo.txHash}/metadata`),
    ]);

    console.log(R1.data);
    console.log(R2.data);

    if (R1.status === 200 && R2.status === 200) {
      const txInfo = R1.data as TransactionSchema;
      const txMetadata = R2.data as MetadataArray;

      const mergedData: GetTxInfoResponse = {
        ...txInfo,
        metadata: txMetadata,
      };

      return mergedData;
    } else {
      throw new Error("One of the requests failed.");
    }
  } catch (error) {
    console.log(error);

    throw error;
  }
}

//////////////////////////////////////////////

async function getUtxo(threadtoken: string): Promise<UtxoResponse> {
  let result = {
    code: 0,
    utxo: {},
  };

  try {
    const getUtxo = await lucid.utxoByUnit(
      threadtoken + fromText("threadtoken")
    );

    if (!getUtxo) {
      result = {
        code: 404,
        utxo: {},
      };
    } else {
      let txInfo: any = await getTxInfo(getUtxo);

      const response = {
        ...getUtxo,
        block_time: txInfo.block_time,
        metadata: txInfo.metadata,
        data: Data.from(getUtxo.datum!, StateMachineDatum),
      };

      result = {
        code: 200,
        utxo: response,
      };
    }
  } catch (err: any) {
    logger.error(err);
  } finally {
    return result;
  }
}

export { StateMachineDatum, lucid, getUtxo };
