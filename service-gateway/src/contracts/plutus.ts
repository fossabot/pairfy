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
        }
      ],
      "compiledCode": "5904de010100323232323232322322322322322322322322533301032323232325332330163001301737540042646644646464a66603860060022a66603e603c6ea80240085854ccc070c01c00454ccc07cc078dd50048010b0a99980e19b874801000454ccc07cc078dd50048010b0b180e1baa0081533301a3001301b3754004264646464646464646464646464a66604e601c018264646464a666056602460586ea80044c8c94ccc0b4c050c0b8dd5000899191929998180048a9998180040a9998180038a99981800108008a5014a0294052819baf3374a900219819a60105d8799f20ff004bd70180798189baa0023300a30103756601e60606ea80040b0c0c8c0bcdd50008b198051bac300c302e3754034466ebcc01cc0bcdd5000980398179baa300e302f37540046060605a6ea800458cc020dd6180218161baa01823375e600a605a6ea8004050cc014dd6180318159baa0170233253330293014302a3754002266e20074dd6981718159baa00114a0600460546ea8c008c0a8dd5180198151baa016300e375a605860526ea8c0b003454ccc09cc0480304c8c8c8c94ccc0acc048c0b0dd5000899192999816980a18171baa001132323232533303100a15333031009153330310081533303100315333031002100114a029405280a5014a066ebccdd2a40086606898105d8799f01ff004bd70180818191baa0033370e64a666060603660626ea8004520001375a606a60646ea8004c94ccc0c0c06cc0c4dd50008a60103d87a8000132330010013756606c60666ea8008894ccc0d4004530103d87a800013233322253330363372291100003153330363371e910100003130153303a375000497ae014c0103d87a8000133006006001375c60680026eb4c0d4004c0e4008c0dc004c8cc004004dd5980898191baa00322533303400114c103d87a800013233322253330353372291100003153330353371e9101000031301433039374c00497ae014c0103d87a8000133006006001375c60660026eacc0d0004c0e0008c0d8004cdc00138129980518081bab300f303037540020586064605e6ea800458cc028dd6180618171baa01a23375e600e605e6ea8004c01cc0bcdd5180718179baa0023030302d37540022c660106eb0c010c0b0dd500c119baf3005302d37540020286600a6eb0c018c0acdd500b812992999814980a18151baa0011337106eb4c0b8c0acdd500080e8a503002302a3754600460546ea8c00cc0a8dd500b18071bad302c30293754605801a264a66605060266eb4c0b4c0a8dd5181680708008a503370e0320324605800246056605860586058605860586058605800244646600200200644a66605600229404cc894ccc0a8cdc78010028a51133004004001375c605a002605c002460526054605460546054605460546054605400244646600200200644a6660520022980103d87a80001332253330283005002130073302c0024bd70099802002000981580098160009ba5480008c098c09cc09c0048c094c0980048c008004c004004894ccc08400452f5c0266044603e604600266004004604800260386ea8c080c084004cc078c07cc070dd50011980f003a5eb8058dc3a400060380026038603a00260306ea8008dc3a40042c603260340066030004602e004602e00260246ea800452613656375a0026eb4004dd68009bad001375c0026eb8004dd7000ab9a5573aaae7955cfaba05742ae89",
      "hash": "55c8b161e48825315aa5ea69e2f20c78d019addd17c8452ab41d8400"
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
        }
      ],
      "compiledCode": "5904de010100323232323232322322322322322322322322533301032323232325332330163001301737540042646644646464a66603860060022a66603e603c6ea80240085854ccc070c01c00454ccc07cc078dd50048010b0a99980e19b874801000454ccc07cc078dd50048010b0b180e1baa0081533301a3001301b3754004264646464646464646464646464a66604e601c018264646464a666056602460586ea80044c8c94ccc0b4c050c0b8dd5000899191929998180048a9998180040a9998180038a99981800108008a5014a0294052819baf3374a900219819a60105d8799f20ff004bd70180798189baa0023300a30103756601e60606ea80040b0c0c8c0bcdd50008b198051bac300c302e3754034466ebcc01cc0bcdd5000980398179baa300e302f37540046060605a6ea800458cc020dd6180218161baa01823375e600a605a6ea8004050cc014dd6180318159baa0170233253330293014302a3754002266e20074dd6981718159baa00114a0600460546ea8c008c0a8dd5180198151baa016300e375a605860526ea8c0b003454ccc09cc0480304c8c8c8c94ccc0acc048c0b0dd5000899192999816980a18171baa001132323232533303100a15333031009153330310081533303100315333031002100114a029405280a5014a066ebccdd2a40086606898105d8799f01ff004bd70180818191baa0033370e64a666060603660626ea8004520001375a606a60646ea8004c94ccc0c0c06cc0c4dd50008a60103d87a8000132330010013756606c60666ea8008894ccc0d4004530103d87a800013233322253330363372291100003153330363371e910100003130153303a375000497ae014c0103d87a8000133006006001375c60680026eb4c0d4004c0e4008c0dc004c8cc004004dd5980898191baa00322533303400114c103d87a800013233322253330353372291100003153330353371e9101000031301433039374c00497ae014c0103d87a8000133006006001375c60660026eacc0d0004c0e0008c0d8004cdc00138129980518081bab300f303037540020586064605e6ea800458cc028dd6180618171baa01a23375e600e605e6ea8004c01cc0bcdd5180718179baa0023030302d37540022c660106eb0c010c0b0dd500c119baf3005302d37540020286600a6eb0c018c0acdd500b812992999814980a18151baa0011337106eb4c0b8c0acdd500080e8a503002302a3754600460546ea8c00cc0a8dd500b18071bad302c30293754605801a264a66605060266eb4c0b4c0a8dd5181680708008a503370e0320324605800246056605860586058605860586058605800244646600200200644a66605600229404cc894ccc0a8cdc78010028a51133004004001375c605a002605c002460526054605460546054605460546054605400244646600200200644a6660520022980103d87a80001332253330283005002130073302c0024bd70099802002000981580098160009ba5480008c098c09cc09c0048c094c0980048c008004c004004894ccc08400452f5c0266044603e604600266004004604800260386ea8c080c084004cc078c07cc070dd50011980f003a5eb8058dc3a400060380026038603a00260306ea8008dc3a40042c603260340066030004602e004602e00260246ea800452613656375a0026eb4004dd68009bad001375c0026eb8004dd7000ab9a5573aaae7955cfaba05742ae89",
      "hash": "55c8b161e48825315aa5ea69e2f20c78d019addd17c8452ab41d8400"
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
        },
        {
          "title": "Shipping",
          "dataType": "constructor",
          "index": 2,
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
