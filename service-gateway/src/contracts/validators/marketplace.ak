use aiken/collection/list
use cardano/transaction.{OutputReference, Transaction, Input, InlineDatum}
use cardano/assets.{PolicyId}
use cardano/assets
use aiken/collection/dict
use aiken/crypto.{VerificationKeyHash}

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


type POSIXTime =
  Int

pub type StateMachineDatum {
  state: Int,
  buyer: VerificationKeyHash,
  seller: VerificationKeyHash,
  price: Int,
  collateral: Int,
  accept_range: POSIXTime
}

pub type StateMachineInput {
  Return
  Locking
}

validator statemachine(threadtoken: PolicyId) {
  spend(
    datum_opt: Option<StateMachineDatum>,
    redeemer: StateMachineInput,
    own_ref: OutputReference,
    transaction: Transaction,
  ) -> Bool {
        expect Some(datum) = datum_opt
        
        when (datum, redeemer) is {
          (StateMachineDatum { state, buyer, seller, price, collateral, accept_range }, Return) -> {
            let must_be_state = state == 0  

            let must_be_signed =
              list.has(transaction.extra_signatories, buyer)
            //One of the transaction inputs belongs to the statemachine.
            expect Some(sm_input) = 
              list.find(transaction.inputs, fn(input) { input.output_reference == own_ref })            
            //One of the transaction outputs contains the threadtoken addressed to the statemachine itself - 1.
            expect Some(sm_output) = 
              list.find(transaction.outputs, fn(output) { output.address == sm_input.output.address })
            //One of the transaction outputs contains the threadtoken addressed to the statemachine itself - 2.
            let must_be_policy = list.has(assets.policies(sm_output.value), threadtoken)

            //verification of the new datum - 1.
            let new_data: Data = StateMachineDatum {
              state : -1,
              buyer: buyer,
              seller : seller,
              collateral : collateral,
              price: price,
              accept_range: accept_range
            }
            //verification of the new datum - 2.
            let must_be_datum = InlineDatum(new_data) == sm_output.datum

            and {
              must_be_state?,
              must_be_signed?,
              must_be_policy?,
              must_be_datum?
            }
          }

          _ -> False
        }
  }
}



