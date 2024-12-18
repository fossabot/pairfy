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
      "compiledCode": "59049e010100323232323232322322322322322322322533300e32323232325332330143001301537540042646644646464a66603460060022a66603a60386ea80240085854ccc068c01c00454ccc074c070dd50048010b0b180d1baa008153330183001301937540042646464646464646464646464a666048601a604a6ea8c0a4c0a80304c8c8c8c94ccc0a0c044c0a4dd5000899192999815180998159baa0011323232533302d0091533302d0081533302d0071533302d002100114a029405280a503375e66e952004330304c105d8799f20ff004bd70180798171baa0023300a30103756601e605a6ea80040a4c0bcc0b0dd50008b198051bac300c302b3754032466ebcc01cc0b0dd5000980398161baa300e302c3754004605a60546ea800458cc020dd6180218149baa01723375e600a60546ea800404ccc014dd6180318141baa016020325333026301330273754002266e20068dd6981598141baa00114a06004604e6ea8c008c09cdd5180198139baa015300d375a6052604c6ea8c0a40304c8c8c8c94ccc0a0c044c0a4dd5000899192999815180998159baa001132323232533302e00a1533302e0091533302e0081533302e0031533302e002100114a029405280a5014a066ebccdd2a400866062980105d8799f01ff004bd70180818179baa0033370e64a66605a6034605c6ea8004520001375a6064605e6ea8004c94ccc0b4c068c0b8dd50008a60103d87a8000132330010013756606660606ea8008894ccc0c8004530103d87a800013233322253330333372291100003153330333371e9101000031301533037375000497ae014c0103d87a8000133006006001375c60620026eb4c0c8004c0d8008c0d0004c8cc004004dd5980898179baa00322533303100114c103d87a800013233322253330323372291100003153330323371e9101000031301433036374c00497ae014c0103d87a8000133006006001375c60600026eacc0c4004c0d4008c0cc004cdc00120111980518081bab300f302d3754002052605e60586ea800458cc028dd6180618159baa01923375e600e60586ea8004c01cc0b0dd5180718161baa002302d302a37540022c660106eb0c010c0a4dd500b919baf3005302a37540020266600a6eb0c018c0a0dd500b011192999813180998139baa0011337106eb4c0acc0a0dd500080d0a503002302737546004604e6ea8c00cc09cdd500a98069bad30293026375460520184605200246050605260526052605260526052605200244646600200200644a66605000229404cc894ccc09ccdc78010028a51133004004001375c605400260560024604c604e604e604e604e604e604e604e604e00244646600200200644a66604c002298103d87a8000133225333025300500213007330290024bd70099802002000981400098148009ba5480008c08cc090c0900048c088c08c0048c008004c004004894ccc07800452f5c026603e6038604000266004004604200266038603a60346ea8008cc07001d2f5c02c6e1d2000301a001301a301b001301637540046e1d200216301730180033016002301500230150013010375400229309b2b1bad001375a0026eb4004dd70009bae001375c002ae6955ceaab9e5573eae815d0aba201",
      "hash": "378b8ce2462c765c38b6708cc63e55340228f42ccf4376fceb0ad74b"
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
      "compiledCode": "59049e010100323232323232322322322322322322322533300e32323232325332330143001301537540042646644646464a66603460060022a66603a60386ea80240085854ccc068c01c00454ccc074c070dd50048010b0b180d1baa008153330183001301937540042646464646464646464646464a666048601a604a6ea8c0a4c0a80304c8c8c8c94ccc0a0c044c0a4dd5000899192999815180998159baa0011323232533302d0091533302d0081533302d0071533302d002100114a029405280a503375e66e952004330304c105d8799f20ff004bd70180798171baa0023300a30103756601e605a6ea80040a4c0bcc0b0dd50008b198051bac300c302b3754032466ebcc01cc0b0dd5000980398161baa300e302c3754004605a60546ea800458cc020dd6180218149baa01723375e600a60546ea800404ccc014dd6180318141baa016020325333026301330273754002266e20068dd6981598141baa00114a06004604e6ea8c008c09cdd5180198139baa015300d375a6052604c6ea8c0a40304c8c8c8c94ccc0a0c044c0a4dd5000899192999815180998159baa001132323232533302e00a1533302e0091533302e0081533302e0031533302e002100114a029405280a5014a066ebccdd2a400866062980105d8799f01ff004bd70180818179baa0033370e64a66605a6034605c6ea8004520001375a6064605e6ea8004c94ccc0b4c068c0b8dd50008a60103d87a8000132330010013756606660606ea8008894ccc0c8004530103d87a800013233322253330333372291100003153330333371e9101000031301533037375000497ae014c0103d87a8000133006006001375c60620026eb4c0c8004c0d8008c0d0004c8cc004004dd5980898179baa00322533303100114c103d87a800013233322253330323372291100003153330323371e9101000031301433036374c00497ae014c0103d87a8000133006006001375c60600026eacc0c4004c0d4008c0cc004cdc00120111980518081bab300f302d3754002052605e60586ea800458cc028dd6180618159baa01923375e600e60586ea8004c01cc0b0dd5180718161baa002302d302a37540022c660106eb0c010c0a4dd500b919baf3005302a37540020266600a6eb0c018c0a0dd500b011192999813180998139baa0011337106eb4c0acc0a0dd500080d0a503002302737546004604e6ea8c00cc09cdd500a98069bad30293026375460520184605200246050605260526052605260526052605200244646600200200644a66605000229404cc894ccc09ccdc78010028a51133004004001375c605400260560024604c604e604e604e604e604e604e604e604e00244646600200200644a66604c002298103d87a8000133225333025300500213007330290024bd70099802002000981400098148009ba5480008c08cc090c0900048c088c08c0048c008004c004004894ccc07800452f5c026603e6038604000266004004604200266038603a60346ea8008cc07001d2f5c02c6e1d2000301a001301a301b001301637540046e1d200216301730180033016002301500230150013010375400229309b2b1bad001375a0026eb4004dd70009bae001375c002ae6955ceaab9e5573eae815d0aba201",
      "hash": "378b8ce2462c765c38b6708cc63e55340228f42ccf4376fceb0ad74b"
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
