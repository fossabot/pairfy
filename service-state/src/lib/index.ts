import { logger } from "../utils/index.js";
import { axiosAPI } from "../axios/index.js";
import { Blockfrost, Data, fromText, Lucid } from "@lucid-evolution/lucid";
import { PoolConnection } from "mysql2";

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
      let response: any = await axiosAPI.get(`/txs/${utxo.txHash}`);

      if (response.status === 200) {
        const data = Data.from(utxo.datum, StateMachineDatum);

        result = {
          code: 200,
          utxo: {
            ...utxo,
            block_time: response.data.block_time,
            data,
          },
        };
      }
    }
  } catch (err: any) {
    if (err.message === "Unit not found.") {
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

async function handlePending(
  connection: PoolConnection,
  threadtoken: string,
  finished: boolean,
  timestamp: number,
  utxo: any
) {
  const statusLog = "Pending";

  const updateQuery = `
  UPDATE orders
  SET finished = ?,
      scanned_at = ?,
      status_log = ?,
      contract_address = ?,
      contract_state = ?,
      pending_tx = ?,
      pending_block = ?
  WHERE id = ?`;

  const pendingTx = utxo.txHash + "#" + utxo.outputIndex;

  await connection.execute(updateQuery, [
    finished,
    timestamp,
    statusLog,
    utxo.address,
    utxo.data.state,
    pendingTx,
    utxo.block_time,
    threadtoken,
  ]);

}
export { StateMachineDatum, lucid, getUtxo, handlePending };
