import { Blockfrost, Data, Lucid } from "@lucid-evolution/lucid";

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

export { StateMachineDatum, lucid }