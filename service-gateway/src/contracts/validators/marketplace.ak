use aiken/collection/list
use cardano/transaction.{OutputReference, Transaction, Input}
use cardano/assets.{PolicyId}
use cardano/assets
use aiken/collection/dict

pub type ThreadTokenInput {
  Mint
  Burn
}

validator threadtoken(token_name: ByteArray, utxo_ref: OutputReference) {
   mint(redeemer: ThreadTokenInput, policy_id: PolicyId, tx: Transaction) -> Bool {
    let Transaction { inputs, mint, .. } = tx

    expect [Pair(asset_name, amount)] =
      mint
        |> assets.tokens(policy_id)
        |> dict.to_pairs()

    when redeemer is {
      Mint -> {
        expect Some(_input) =
          list.find(inputs, fn(input) { input.output_reference == utxo_ref })
       
        amount == 1 && asset_name == token_name
      }

      Burn -> amount == -1 && asset_name == token_name
    }
  }
}





