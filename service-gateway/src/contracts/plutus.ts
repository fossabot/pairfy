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
      "compiledCode": "5905e0010100323232323232322322322322322322322322533301032323232325332330163001301737540042646644646464a66603860060022a66603e603c6ea80240085854ccc070c01c00454ccc07cc078dd50048010b0a99980e19b874801000454ccc07cc078dd50048010b0b180e1baa0081533301a3001301b375400426464646464646464646464646464a646660526020004264646464a66605a6028605c6ea80044c8c94ccc0bcc058c0c0dd5000899191929998190048a9998190040a9998190038a99981900108008a5014a0294052819baf3009330354c105d8799f20ff004bd70180818199baa0023300c30113756602060646ea80040b8c0d0c0c4dd50008b198061bac300d30303754038466ebcc024c0c4dd5000980498189baa300f303137540046064605e6ea800458cc028dd6180318171baa01a23375e600e605e6ea8004058cc01cdd6180418169baa01902532533302b3016302c3754002266e2007cdd6981818169baa00114a0600860586ea8c010c0b0dd5180298161baa0183010375a605c60566ea8c0b803c54ccc0a4c0500084c8c8c8c94ccc0b4c050c0b8dd5000899192999817980b18181baa001132323232533303300a15333033009153330330081533303300315333033002100114a029405280a5014a066ebcc028cc0d9300105d8799f01ff004bd701808981a1baa0033370e602a6eacc044c0ccdd500119b800290273300c30113756602060646ea80040b8c0d0c0c4dd50008b198061bac300d30303754038466ebcc024c0c4dd5000980498189baa300f303137540046064605e6ea800458cc028dd6180318171baa01a23375e600e605e6ea8004058cc01cdd6180418169baa01902732533302b3016302c3754002266e20dd6981818169baa00101f14a0600860586ea8c010c0b0dd5180298161baa0183010375a605c60566ea8c0b803c4c8c8c8c94ccc0b4c050c0b8dd5000899192999817980b18181baa001132323232533303300a15333033009153330330081533303300315333033002100114a029405280a5014a066ebcc028cc0d930105d8799f02ff004bd701808981a1baa0033370e602a6eacc044c0ccdd500119b800290273300c30113756602060646ea80040b8c0d0c0c4dd50008b198061bac300d30303754038466ebcc024c0c4dd5000980498189baa300f303137540046064605e6ea800458cc028dd6180318171baa01a23375e600e605e6ea8004058cc01cdd6180418169baa01902732533302b3016302c3754002266e20dd6981818169baa00101d14a0600860586ea8c010c0b0dd5180298161baa0183014375a605c60566ea8c0b803cdd2a400860506ea8c0b0c0b40348c0b00048c0acc0b0c0b0c0b0c0b0c0b0c0b0c0b000488c8cc00400400c894ccc0ac00452809991299981519b8f00200514a22660080080026eb8c0b4004c0b80048c0a4c0a8c0a8c0a8c0a8c0a8c0a8c0a8c0a800488c8cc00400400c894ccc0a40045300103d87a800013322533302830050021300d3302c0024bd700998020020009815800981600091813981418140009181318138009180100098008009129998110008a5eb804cc08cc080c090004cc008008c0940048c94ccc078c024c07cdd50008a400026eb4c08cc080dd500099299980f1804980f9baa00114c103d87a8000132330010013756604860426ea8008894ccc08c004530103d87a800013233322253330243372291100003153330243371e9101000031300933028375000497ae014c0103d87a8000133006006001375c60440026eb4c08c004c09c008c094004c8cc004004008894ccc0880045300103d87a800013233322253330233372291100003153330233371e9101000031300833027374c00497ae014c0103d87a8000133006006001375c60420026eacc088004c098008c090004dd2a40006603c603e60386ea8008cc07801d2f5c02c6e1d2000301c001301c301d001301837540046e1d2002163019301a0033018002301700230170013012375400229309b2b1bad001375a0026eb4004dd68009bae001375c0026eb80055cd2ab9d5573caae7d5d02ba15745",
      "hash": "9ee6b20c1973927d5dfd83c750816dda26f55dfc28396bd229143b4a"
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
      "compiledCode": "5905e0010100323232323232322322322322322322322322533301032323232325332330163001301737540042646644646464a66603860060022a66603e603c6ea80240085854ccc070c01c00454ccc07cc078dd50048010b0a99980e19b874801000454ccc07cc078dd50048010b0b180e1baa0081533301a3001301b375400426464646464646464646464646464a646660526020004264646464a66605a6028605c6ea80044c8c94ccc0bcc058c0c0dd5000899191929998190048a9998190040a9998190038a99981900108008a5014a0294052819baf3009330354c105d8799f20ff004bd70180818199baa0023300c30113756602060646ea80040b8c0d0c0c4dd50008b198061bac300d30303754038466ebcc024c0c4dd5000980498189baa300f303137540046064605e6ea800458cc028dd6180318171baa01a23375e600e605e6ea8004058cc01cdd6180418169baa01902532533302b3016302c3754002266e2007cdd6981818169baa00114a0600860586ea8c010c0b0dd5180298161baa0183010375a605c60566ea8c0b803c54ccc0a4c0500084c8c8c8c94ccc0b4c050c0b8dd5000899192999817980b18181baa001132323232533303300a15333033009153330330081533303300315333033002100114a029405280a5014a066ebcc028cc0d9300105d8799f01ff004bd701808981a1baa0033370e602a6eacc044c0ccdd500119b800290273300c30113756602060646ea80040b8c0d0c0c4dd50008b198061bac300d30303754038466ebcc024c0c4dd5000980498189baa300f303137540046064605e6ea800458cc028dd6180318171baa01a23375e600e605e6ea8004058cc01cdd6180418169baa01902732533302b3016302c3754002266e20dd6981818169baa00101f14a0600860586ea8c010c0b0dd5180298161baa0183010375a605c60566ea8c0b803c4c8c8c8c94ccc0b4c050c0b8dd5000899192999817980b18181baa001132323232533303300a15333033009153330330081533303300315333033002100114a029405280a5014a066ebcc028cc0d930105d8799f02ff004bd701808981a1baa0033370e602a6eacc044c0ccdd500119b800290273300c30113756602060646ea80040b8c0d0c0c4dd50008b198061bac300d30303754038466ebcc024c0c4dd5000980498189baa300f303137540046064605e6ea800458cc028dd6180318171baa01a23375e600e605e6ea8004058cc01cdd6180418169baa01902732533302b3016302c3754002266e20dd6981818169baa00101d14a0600860586ea8c010c0b0dd5180298161baa0183014375a605c60566ea8c0b803cdd2a400860506ea8c0b0c0b40348c0b00048c0acc0b0c0b0c0b0c0b0c0b0c0b0c0b000488c8cc00400400c894ccc0ac00452809991299981519b8f00200514a22660080080026eb8c0b4004c0b80048c0a4c0a8c0a8c0a8c0a8c0a8c0a8c0a8c0a800488c8cc00400400c894ccc0a40045300103d87a800013322533302830050021300d3302c0024bd700998020020009815800981600091813981418140009181318138009180100098008009129998110008a5eb804cc08cc080c090004cc008008c0940048c94ccc078c024c07cdd50008a400026eb4c08cc080dd500099299980f1804980f9baa00114c103d87a8000132330010013756604860426ea8008894ccc08c004530103d87a800013233322253330243372291100003153330243371e9101000031300933028375000497ae014c0103d87a8000133006006001375c60440026eb4c08c004c09c008c094004c8cc004004008894ccc0880045300103d87a800013233322253330233372291100003153330233371e9101000031300833027374c00497ae014c0103d87a8000133006006001375c60420026eacc088004c098008c090004dd2a40006603c603e60386ea8008cc07801d2f5c02c6e1d2000301c001301c301d001301837540046e1d2002163019301a0033018002301700230170013012375400229309b2b1bad001375a0026eb4004dd68009bae001375c0026eb80055cd2ab9d5573caae7d5d02ba15745",
      "hash": "9ee6b20c1973927d5dfd83c750816dda26f55dfc28396bd229143b4a"
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
