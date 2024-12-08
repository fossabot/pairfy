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
        }
      ],
      "compiledCode": "5902c6010100323232323232322322322322322322322533300e32323232325332330143001301537540042646644646464a66603460060022a66603a60386ea80240085854ccc068c01c00454ccc074c070dd50048010b0b180d1baa008153330183001301937540042646464a666036600860386ea8c080c08400c4c8c8c8c8c8c94ccc084c028c088dd50008991919192999812980718131baa0011323232533302800c1533302800b1533302800a15333028002100114a029405280a503375e66e9520043302b4c105d8799f20ff004bd70180218149baa0023300c32330010013756600a60526ea8008894ccc0ac00452f5c02660586052605a00266004004605c0020486054604e6ea800458cc014dd6180098131baa01423375e6014604e6ea8004c028c09cdd5180198139baa00423029302a302a0012302830290013026302337540022c660026eb0c014c088dd5008119baf30063023375400201844646600200200644a66604c0022980103d87a8000133225333025300500213374a90001981480125eb804cc010010004c0a0004c0a4004cc010dd6180298101baa00e0183006375a6044603e6ea8c088014c94ccc074c028c078dd5000899b89011375a6044603e6ea80045281800980f1baa3001301e375460426044604460446044604460446044603c6ea80308c0840044c8c94ccc074cc00cdd61802180f9baa00d0191533301d002100114a02940cdc380900a18021bad3020301d3754604000644646600200200644a66604200229404cc894ccc080cdc78010028a51133004004001375c604600260480024603e6040604060406040604060406040604000266038603a60346ea8008cc07001d2f5c02c6e1d2000301a001301a301b001301637540046e1d200216301730180033016002301500230150013010375400229309b2b1bad001375a0026eb4004dd70009bae001375c002ae6955ceaab9e5573eae815d0aba21",
      "hash": "d7f2e69c5eb1973cedaf54bc8fcaf69f89d9e52de0b542f8ebb2b370"
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
        }
      ],
      "compiledCode": "5902c6010100323232323232322322322322322322322533300e32323232325332330143001301537540042646644646464a66603460060022a66603a60386ea80240085854ccc068c01c00454ccc074c070dd50048010b0b180d1baa008153330183001301937540042646464a666036600860386ea8c080c08400c4c8c8c8c8c8c94ccc084c028c088dd50008991919192999812980718131baa0011323232533302800c1533302800b1533302800a15333028002100114a029405280a503375e66e9520043302b4c105d8799f20ff004bd70180218149baa0023300c32330010013756600a60526ea8008894ccc0ac00452f5c02660586052605a00266004004605c0020486054604e6ea800458cc014dd6180098131baa01423375e6014604e6ea8004c028c09cdd5180198139baa00423029302a302a0012302830290013026302337540022c660026eb0c014c088dd5008119baf30063023375400201844646600200200644a66604c0022980103d87a8000133225333025300500213374a90001981480125eb804cc010010004c0a0004c0a4004cc010dd6180298101baa00e0183006375a6044603e6ea8c088014c94ccc074c028c078dd5000899b89011375a6044603e6ea80045281800980f1baa3001301e375460426044604460446044604460446044603c6ea80308c0840044c8c94ccc074cc00cdd61802180f9baa00d0191533301d002100114a02940cdc380900a18021bad3020301d3754604000644646600200200644a66604200229404cc894ccc080cdc78010028a51133004004001375c604600260480024603e6040604060406040604060406040604000266038603a60346ea8008cc07001d2f5c02c6e1d2000301a001301a301b001301637540046e1d200216301730180033016002301500230150013010375400229309b2b1bad001375a0026eb4004dd70009bae001375c002ae6955ceaab9e5573eae815d0aba21",
      "hash": "d7f2e69c5eb1973cedaf54bc8fcaf69f89d9e52de0b542f8ebb2b370"
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
        }
      ],
      "compiledCode": "5901ac01010032323232323232232225333005323232323253323300b3001300c3754004264646464a66601e600a0022a66602460226ea801c0085854ccc03cc00c00454ccc048c044dd50038010b0b18079baa006132323232533301430170021323253330133009301437540162a666026601260286ea8c8cc004004018894ccc0600045300103d87a80001332253330173375e603860326ea80080504cdd2a40006603600497ae0133004004001301a001301b00115333013300700113371e00402229405854ccc04ccdc3800a4002266e3c0080445281bad3014002375c60240022c602a00264a666020600860226ea800452f5bded8c026eacc054c048dd500099198008009bab3015301630163016301600322533301400114c103d87a80001323332225333015337220140062a66602a66e3c02800c4cdd2a4000660326e980092f5c02980103d87a8000133006006001375c60260026eacc050004c060008c058004dd6180980098079baa006370e90011bae3010300d37540046e1d200016300e300f003300d002300c002300c0013007375400229309b2b1bae0015734aae7555cf2ab9f5740ae855d11",
      "hash": "d543ccb30468675e4394e4684a894cc96c87d72b44ee55f74ccf795d"
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
        }
      ],
      "compiledCode": "5901ac01010032323232323232232225333005323232323253323300b3001300c3754004264646464a66601e600a0022a66602460226ea801c0085854ccc03cc00c00454ccc048c044dd50038010b0b18079baa006132323232533301430170021323253330133009301437540162a666026601260286ea8c8cc004004018894ccc0600045300103d87a80001332253330173375e603860326ea80080504cdd2a40006603600497ae0133004004001301a001301b00115333013300700113371e00402229405854ccc04ccdc3800a4002266e3c0080445281bad3014002375c60240022c602a00264a666020600860226ea800452f5bded8c026eacc054c048dd500099198008009bab3015301630163016301600322533301400114c103d87a80001323332225333015337220140062a66602a66e3c02800c4cdd2a4000660326e980092f5c02980103d87a8000133006006001375c60260026eacc050004c060008c058004dd6180980098079baa006370e90011bae3010300d37540046e1d200016300e300f003300d002300c002300c0013007375400229309b2b1bae0015734aae7555cf2ab9f5740ae855d11",
      "hash": "d543ccb30468675e4394e4684a894cc96c87d72b44ee55f74ccf795d"
    }
  ],
  "definitions": {
    "ByteArray": {
      "dataType": "bytes"
    },
    "Int": {
      "dataType": "integer"
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
