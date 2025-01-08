export const blueprint = 
{
  "preamble": {
    "title": "aiken-lang/contracts",
    "description": "Aiken contracts for project 'aiken-lang/contracts'",
    "version": "0.0.0",
    "plutusVersion": "v3",
    "compiler": {
      "name": "Aiken",
      "version": "v1.1.7+e2fb28b"
    },
    "license": "Apache-2.0"
  },
  "validators": [
    {
      "title": "marketplace.statemachine.spend",
      "datum": {
        "title": "datum_opt",
        "schema": {
          "$ref": "#/definitions/marketplace~1StateMachineDatum"
        }
      },
      "redeemer": {
        "title": "redeemer",
        "schema": {
          "$ref": "#/definitions/marketplace~1StateMachineInput"
        }
      },
      "parameters": [
        {
          "title": "threadtoken",
          "schema": {
            "$ref": "#/definitions/PolicyId"
          }
        },
        {
          "title": "seller",
          "schema": {
            "$ref": "#/definitions/VerificationKeyHash"
          }
        },
        {
          "title": "buyer",
          "schema": {
            "$ref": "#/definitions/VerificationKeyHash"
          }
        },
        {
          "title": "price",
          "schema": {
            "$ref": "#/definitions/Int"
          }
        },
        {
          "title": "collateral",
          "schema": {
            "$ref": "#/definitions/Int"
          }
        },
        {
          "title": "pending_until",
          "schema": {
            "$ref": "#/definitions/POSIXTime"
          }
        },
        {
          "title": "shipping_until",
          "schema": {
            "$ref": "#/definitions/POSIXTime"
          }
        },
        {
          "title": "expire_until",
          "schema": {
            "$ref": "#/definitions/POSIXTime"
          }
        }
      ],
      "compiledCode": "590632010100323232323232322322322322322322322322322533301232323232325332330183001301937540042646644646464a66603c60060022a66604260406ea80240085854ccc078c01c00454ccc084c080dd50048010b0a99980f19b87480100044c8c94ccc08cc09800801058dd6981200098101baa00916301e37540102a6660386002603a6ea80084c8c8c8c8c8c8c8c8c8c8c8c8c8c8c94c8ccc0b0c0440084c8c8c8c94ccc0c0c054c0c4dd5000899192999819180b98199baa00113232325333035009153330350081533303500715333035002100114a029405280a503375e601266070980108d8799f20d87a80ff004bd701808981b1baa0023300d301237566022606a6ea80040c4c0dcc0d0dd50008b198069bac300e3033375403a466ebcc028c0d0dd50009805181a1baa301030343754004606a60646ea800458cc02cdd6180398189baa01b23375e601060646ea800405ccc020dd6180498181baa01a02832533302e3017302f3754002266e20088dd6981998181baa00114a0600a605e6ea8c014c0bcdd5180318179baa0193011375a6062605c6ea8c0c404054ccc0b0c0540084c8c8c8c94ccc0c0c054c0c4dd5000899192999819180b98199baa001132323232533303600a15333036009153330360081533303600315333036002100114a029405280a5014a066ebcc028cc0e5300108d8799f01d87a80ff004bd701809181b9baa0033370e602c6eacc048c0d8dd500119b8002c02a3300d301237566022606a6ea80040c4c0dcc0d0dd50008b198069bac300e3033375403a466ebcc028c0d0dd50009805181a1baa301030343754004606a60646ea800458cc02cdd6180398189baa01b23375e601060646ea800405ccc020dd6180498181baa01a02a32533302e3017302f3754002266e20dd6981998181baa00102214a0600a605e6ea8c014c0bcdd5180318179baa0193011375a6062605c6ea8c0c40404cc88c8c8c8c8c8c94ccc0d0c064c0d4dd500089919299981b180d981b9baa001132323232533303a00c1533303a00b1533303a00a1533303a0081533303a0031533303a002100114a029405280a5014a02940cdd798071981e980e1981ea6010102003303d301c3303d375001897ae04bd7025eb80c058c0ecdd500199b87301a3756602c60746ea8008cdc001801719808980b1bab30153039375400206a607660706ea800458cc044dd61809181b9baa02123375e601c60706ea8004c038c0e0dd5180a181c1baa0023039303637540022c6601e6eb0c02cc0d4dd500f919baf300c30363754002036a66606466e20090014400452819b880040213300a3758601660646ea80700b0c94ccc0c0c064c0c4dd5000899b88375a606a60646ea8004088528180398189baa300730313754601060626ea806cc05c008dd6981898171baa3031010375a6062605c6ea800cdd2a400860566ea8004c0b8c0bc0348c0b80048c0b4c0b8c0b8c0b8c0b8c0b8c0b8c0b800488c8cc00400400c894ccc0b400452809991299981619b8f00200514a22660080080026eb8c0bc004c0c00048c0acc0b0c0b0c0b0c0b0c0b0c0b0c0b0c0b000488c8cc00400400c894ccc0ac0045300103d87a800013322533302a30050021300d3302e0024bd700998020020009816800981700091814981518150009181418148009180100098008009129998120008a5eb804cc094c088c098004cc008008c09c0048c94ccc080c024c084dd50008a400026eb4c094c088dd5000992999810180498109baa00114c103d87a8000132330010013756604c60466ea8008894ccc094004530103d87a800013233322253330263372291100003153330263371e910100003130093302a375000497ae014c0103d87a8000133006006001375c60480026eb4c094004c0a4008c09c004c8cc004004008894ccc0900045300103d87a800013233322253330253372291100003153330253371e9101000031300833029374c00497ae014c0103d87a8000133006006001375c60460026eacc090004c0a0008c098004dd2a4000660406042603c6ea8008cc08001d2f5c02c6e1d2000301e001301e301f001301a37540046e1d200216301b301c003301a002301900230190013014375400229309b2b1bad001375a0026eb4004dd68009bad001375c0026eb8004dd7000ab9a5573aaae7955cfaba05742ae881",
      "hash": "3c942f555d4d98b08b616e682565f633da5da275f35f67a0d08a6ce8"
    },
    {
      "title": "marketplace.statemachine.else",
      "redeemer": {
        "schema": {}
      },
      "parameters": [
        {
          "title": "threadtoken",
          "schema": {
            "$ref": "#/definitions/PolicyId"
          }
        },
        {
          "title": "seller",
          "schema": {
            "$ref": "#/definitions/VerificationKeyHash"
          }
        },
        {
          "title": "buyer",
          "schema": {
            "$ref": "#/definitions/VerificationKeyHash"
          }
        },
        {
          "title": "price",
          "schema": {
            "$ref": "#/definitions/Int"
          }
        },
        {
          "title": "collateral",
          "schema": {
            "$ref": "#/definitions/Int"
          }
        },
        {
          "title": "pending_until",
          "schema": {
            "$ref": "#/definitions/POSIXTime"
          }
        },
        {
          "title": "shipping_until",
          "schema": {
            "$ref": "#/definitions/POSIXTime"
          }
        },
        {
          "title": "expire_until",
          "schema": {
            "$ref": "#/definitions/POSIXTime"
          }
        }
      ],
      "compiledCode": "590632010100323232323232322322322322322322322322322533301232323232325332330183001301937540042646644646464a66603c60060022a66604260406ea80240085854ccc078c01c00454ccc084c080dd50048010b0a99980f19b87480100044c8c94ccc08cc09800801058dd6981200098101baa00916301e37540102a6660386002603a6ea80084c8c8c8c8c8c8c8c8c8c8c8c8c8c8c94c8ccc0b0c0440084c8c8c8c94ccc0c0c054c0c4dd5000899192999819180b98199baa00113232325333035009153330350081533303500715333035002100114a029405280a503375e601266070980108d8799f20d87a80ff004bd701808981b1baa0023300d301237566022606a6ea80040c4c0dcc0d0dd50008b198069bac300e3033375403a466ebcc028c0d0dd50009805181a1baa301030343754004606a60646ea800458cc02cdd6180398189baa01b23375e601060646ea800405ccc020dd6180498181baa01a02832533302e3017302f3754002266e20088dd6981998181baa00114a0600a605e6ea8c014c0bcdd5180318179baa0193011375a6062605c6ea8c0c404054ccc0b0c0540084c8c8c8c94ccc0c0c054c0c4dd5000899192999819180b98199baa001132323232533303600a15333036009153330360081533303600315333036002100114a029405280a5014a066ebcc028cc0e5300108d8799f01d87a80ff004bd701809181b9baa0033370e602c6eacc048c0d8dd500119b8002c02a3300d301237566022606a6ea80040c4c0dcc0d0dd50008b198069bac300e3033375403a466ebcc028c0d0dd50009805181a1baa301030343754004606a60646ea800458cc02cdd6180398189baa01b23375e601060646ea800405ccc020dd6180498181baa01a02a32533302e3017302f3754002266e20dd6981998181baa00102214a0600a605e6ea8c014c0bcdd5180318179baa0193011375a6062605c6ea8c0c40404cc88c8c8c8c8c8c94ccc0d0c064c0d4dd500089919299981b180d981b9baa001132323232533303a00c1533303a00b1533303a00a1533303a0081533303a0031533303a002100114a029405280a5014a02940cdd798071981e980e1981ea6010102003303d301c3303d375001897ae04bd7025eb80c058c0ecdd500199b87301a3756602c60746ea8008cdc001801719808980b1bab30153039375400206a607660706ea800458cc044dd61809181b9baa02123375e601c60706ea8004c038c0e0dd5180a181c1baa0023039303637540022c6601e6eb0c02cc0d4dd500f919baf300c30363754002036a66606466e20090014400452819b880040213300a3758601660646ea80700b0c94ccc0c0c064c0c4dd5000899b88375a606a60646ea8004088528180398189baa300730313754601060626ea806cc05c008dd6981898171baa3031010375a6062605c6ea800cdd2a400860566ea8004c0b8c0bc0348c0b80048c0b4c0b8c0b8c0b8c0b8c0b8c0b8c0b800488c8cc00400400c894ccc0b400452809991299981619b8f00200514a22660080080026eb8c0bc004c0c00048c0acc0b0c0b0c0b0c0b0c0b0c0b0c0b0c0b000488c8cc00400400c894ccc0ac0045300103d87a800013322533302a30050021300d3302e0024bd700998020020009816800981700091814981518150009181418148009180100098008009129998120008a5eb804cc094c088c098004cc008008c09c0048c94ccc080c024c084dd50008a400026eb4c094c088dd5000992999810180498109baa00114c103d87a8000132330010013756604c60466ea8008894ccc094004530103d87a800013233322253330263372291100003153330263371e910100003130093302a375000497ae014c0103d87a8000133006006001375c60480026eb4c094004c0a4008c09c004c8cc004004008894ccc0900045300103d87a800013233322253330253372291100003153330253371e9101000031300833029374c00497ae014c0103d87a8000133006006001375c60460026eacc090004c0a0008c098004dd2a4000660406042603c6ea8008cc08001d2f5c02c6e1d2000301e001301e301f001301a37540046e1d200216301b301c003301a002301900230190013014375400229309b2b1bad001375a0026eb4004dd68009bad001375c0026eb8004dd7000ab9a5573aaae7955cfaba05742ae881",
      "hash": "3c942f555d4d98b08b616e682565f633da5da275f35f67a0d08a6ce8"
    },
    {
      "title": "marketplace.threadtoken.mint",
      "redeemer": {
        "title": "redeemer",
        "schema": {
          "$ref": "#/definitions/marketplace~1ThreadTokenInput"
        }
      },
      "parameters": [
        {
          "title": "token_name",
          "schema": {
            "$ref": "#/definitions/ByteArray"
          }
        },
        {
          "title": "utxo_ref",
          "schema": {
            "$ref": "#/definitions/cardano~1transaction~1OutputReference"
          }
        },
        {
          "title": "_timestamp",
          "schema": {
            "$ref": "#/definitions/POSIXTime"
          }
        }
      ],
      "compiledCode": "5901b401010032323232323232232223225333007323232323253323300d3001300e3754004264646464a666022600a0022a66602860266ea801c0085854ccc044c00c00454ccc050c04cdd50038010b0b18089baa006132323232533301630190021323253330153009301637540162a66602a6012602c6ea8c8cc004004018894ccc068004530103d87a80001332253330193375e603c60366ea80080584cdd2a40006603a00497ae0133004004001301c001301d00113253330163008002100114a066e3c00804c5854ccc054cdc3800a4002266e3c00804c5281bad3016002375c60280022c602e00264a666024600860266ea800452f5bded8c026eacc05cc050dd500099198008009bab3017301830183018301800322533301600114c0103d87a80001323332225333017337220140062a66602e66e3c02800c4cdd2a4000660366e980092f5c02980103d87a8000133006006001375c602a0026eacc058004c068008c060004dd6180a80098089baa006370e90011bae3012300f37540046e1d20001630103011003300f002300e002300e0013009375400229309b2b1bad001375c002ae6955ceaab9e5573eae815d0aba201",
      "hash": "804930ac54edcdaf9da3e41b6f2407bee4df7492e1fa904b4551f3be"
    },
    {
      "title": "marketplace.threadtoken.else",
      "redeemer": {
        "schema": {}
      },
      "parameters": [
        {
          "title": "token_name",
          "schema": {
            "$ref": "#/definitions/ByteArray"
          }
        },
        {
          "title": "utxo_ref",
          "schema": {
            "$ref": "#/definitions/cardano~1transaction~1OutputReference"
          }
        },
        {
          "title": "_timestamp",
          "schema": {
            "$ref": "#/definitions/POSIXTime"
          }
        }
      ],
      "compiledCode": "5901b401010032323232323232232223225333007323232323253323300d3001300e3754004264646464a666022600a0022a66602860266ea801c0085854ccc044c00c00454ccc050c04cdd50038010b0b18089baa006132323232533301630190021323253330153009301637540162a66602a6012602c6ea8c8cc004004018894ccc068004530103d87a80001332253330193375e603c60366ea80080584cdd2a40006603a00497ae0133004004001301c001301d00113253330163008002100114a066e3c00804c5854ccc054cdc3800a4002266e3c00804c5281bad3016002375c60280022c602e00264a666024600860266ea800452f5bded8c026eacc05cc050dd500099198008009bab3017301830183018301800322533301600114c0103d87a80001323332225333017337220140062a66602e66e3c02800c4cdd2a4000660366e980092f5c02980103d87a8000133006006001375c602a0026eacc058004c068008c060004dd6180a80098089baa006370e90011bae3012300f37540046e1d20001630103011003300f002300e002300e0013009375400229309b2b1bad001375c002ae6955ceaab9e5573eae815d0aba201",
      "hash": "804930ac54edcdaf9da3e41b6f2407bee4df7492e1fa904b4551f3be"
    }
  ],
  "definitions": {
    "ByteArray": {
      "dataType": "bytes"
    },
    "Int": {
      "dataType": "integer"
    },
    "Option$POSIXTime": {
      "title": "Option",
      "anyOf": [
        {
          "title": "Some",
          "description": "An optional value.",
          "dataType": "constructor",
          "index": 0,
          "fields": [
            {
              "$ref": "#/definitions/POSIXTime"
            }
          ]
        },
        {
          "title": "None",
          "description": "Nothing.",
          "dataType": "constructor",
          "index": 1,
          "fields": []
        }
      ]
    },
    "POSIXTime": {
      "title": "POSIXTime",
      "dataType": "integer"
    },
    "PolicyId": {
      "title": "PolicyId",
      "dataType": "bytes"
    },
    "VerificationKeyHash": {
      "title": "VerificationKeyHash",
      "dataType": "bytes"
    },
    "cardano/transaction/OutputReference": {
      "title": "OutputReference",
      "description": "An `OutputReference` is a unique reference to an output on-chain. The `output_index`\n corresponds to the position in the output list of the transaction (identified by its id)\n that produced that output",
      "anyOf": [
        {
          "title": "OutputReference",
          "dataType": "constructor",
          "index": 0,
          "fields": [
            {
              "title": "transaction_id",
              "$ref": "#/definitions/ByteArray"
            },
            {
              "title": "output_index",
              "$ref": "#/definitions/Int"
            }
          ]
        }
      ]
    },
    "marketplace/StateMachineDatum": {
      "title": "StateMachineDatum",
      "anyOf": [
        {
          "title": "StateMachineDatum",
          "dataType": "constructor",
          "index": 0,
          "fields": [
            {
              "title": "state",
              "$ref": "#/definitions/Int"
            },
            {
              "title": "delivery",
              "$ref": "#/definitions/Option$POSIXTime"
            }
          ]
        }
      ]
    },
    "marketplace/StateMachineInput": {
      "title": "StateMachineInput",
      "anyOf": [
        {
          "title": "Return",
          "dataType": "constructor",
          "index": 0,
          "fields": []
        },
        {
          "title": "Locking",
          "dataType": "constructor",
          "index": 1,
          "fields": []
        },
        {
          "title": "Shipping",
          "dataType": "constructor",
          "index": 2,
          "fields": [
            {
              "title": "delivery_param",
              "$ref": "#/definitions/POSIXTime"
            }
          ]
        }
      ]
    },
    "marketplace/ThreadTokenInput": {
      "title": "ThreadTokenInput",
      "anyOf": [
        {
          "title": "Mint",
          "dataType": "constructor",
          "index": 0,
          "fields": []
        },
        {
          "title": "Burn",
          "dataType": "constructor",
          "index": 1,
          "fields": []
        }
      ]
    }
  }
}
