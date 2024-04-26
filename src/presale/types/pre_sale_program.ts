export type PreSaleProgram = {
  "version": "0.1.0",
  "name": "pre_sale_program",
  "instructions": [
    {
      "name": "initializeProgramConfig",
      "accounts": [
        {
          "name": "programConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectedFundsAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "chainlinkProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateProgramConfig",
      "accounts": [
        {
          "name": "programConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateProgramConfigArgs"
          }
        }
      ]
    },
    {
      "name": "updateVault",
      "accounts": [
        {
          "name": "programConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateVaultArgs"
          }
        }
      ]
    },
    {
      "name": "buyTokens",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userInfoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectedFundsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "chainlinkFeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "chainlinkProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collectedFundsAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "BuyTokensArgs"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "programConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "collectedFundsAccount",
            "type": "publicKey"
          },
          {
            "name": "chainlinkProgram",
            "type": "publicKey"
          },
          {
            "name": "hasPresaleEnded",
            "type": "bool"
          },
          {
            "name": "usdPrice",
            "type": "u8"
          },
          {
            "name": "usdDecimals",
            "type": "u8"
          },
          {
            "name": "feeds",
            "type": {
              "vec": {
                "defined": "PriceFeedInfo"
              }
            }
          }
        ]
      }
    },
    {
      "name": "userInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stake",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "vaultInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stake",
            "type": "u64"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "BuyTokensArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UpdateProgramConfigArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "feeds",
            "type": {
              "option": {
                "vec": {
                  "defined": "PriceFeedInfo"
                }
              }
            }
          },
          {
            "name": "hasPresaleEnded",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "usdPrice",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "usdDecimals",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "collectedFundsAccount",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "chainlinkProgram",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateVaultArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stake",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "decimals",
            "type": {
              "option": "u8"
            }
          }
        ]
      }
    },
    {
      "name": "PriceFeedInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "asset",
            "type": "publicKey"
          },
          {
            "name": "dataFeed",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidVaultMint",
      "msg": "Vault mint is invalid"
    },
    {
      "code": 6001,
      "name": "InvalidTokenAccount",
      "msg": "Invalid payer token account"
    },
    {
      "code": 6002,
      "name": "InvalidPriceFeed",
      "msg": "Provided price feed account is invalid"
    },
    {
      "code": 6003,
      "name": "InvalidChainlinkProgram",
      "msg": "Invalid Chainlink program account"
    },
    {
      "code": 6004,
      "name": "InvalidChainlinkFeed",
      "msg": "Invalid chainlink_feed account or payer_mint and chainlink_feed don't match"
    },
    {
      "code": 6005,
      "name": "MathOverflow",
      "msg": "Math operation overflow"
    },
    {
      "code": 6006,
      "name": "LessThanMinimalValue",
      "msg": "Payer value is less than minimal"
    },
    {
      "code": 6007,
      "name": "IvalidCollectedFundsAccount",
      "msg": "Collected funds account invalid"
    },
    {
      "code": 6008,
      "name": "InsufficientVaultBalance",
      "msg": "Amount of purchase is bigger than the amount in the treasury"
    },
    {
      "code": 6009,
      "name": "ConversionError",
      "msg": "Error occurred while converting mints"
    },
    {
      "code": 6010,
      "name": "PreSaleStillOn",
      "msg": "Pre-sale campaign has not ended"
    },
    {
      "code": 6011,
      "name": "PreSaleEnded",
      "msg": "Pre-sale campaign ended"
    }
  ]
};

export const IDL: PreSaleProgram = {
  "version": "0.1.0",
  "name": "pre_sale_program",
  "instructions": [
    {
      "name": "initializeProgramConfig",
      "accounts": [
        {
          "name": "programConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectedFundsAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "chainlinkProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateProgramConfig",
      "accounts": [
        {
          "name": "programConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateProgramConfigArgs"
          }
        }
      ]
    },
    {
      "name": "updateVault",
      "accounts": [
        {
          "name": "programConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateVaultArgs"
          }
        }
      ]
    },
    {
      "name": "buyTokens",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "programConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "vaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userInfoAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectedFundsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "chainlinkFeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "chainlinkProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "collectedFundsAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "BuyTokensArgs"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "programConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "collectedFundsAccount",
            "type": "publicKey"
          },
          {
            "name": "chainlinkProgram",
            "type": "publicKey"
          },
          {
            "name": "hasPresaleEnded",
            "type": "bool"
          },
          {
            "name": "usdPrice",
            "type": "u8"
          },
          {
            "name": "usdDecimals",
            "type": "u8"
          },
          {
            "name": "feeds",
            "type": {
              "vec": {
                "defined": "PriceFeedInfo"
              }
            }
          }
        ]
      }
    },
    {
      "name": "userInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stake",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "vaultInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stake",
            "type": "u64"
          },
          {
            "name": "decimals",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "BuyTokensArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UpdateProgramConfigArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "feeds",
            "type": {
              "option": {
                "vec": {
                  "defined": "PriceFeedInfo"
                }
              }
            }
          },
          {
            "name": "hasPresaleEnded",
            "type": {
              "option": "bool"
            }
          },
          {
            "name": "usdPrice",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "usdDecimals",
            "type": {
              "option": "u8"
            }
          },
          {
            "name": "collectedFundsAccount",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "chainlinkProgram",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateVaultArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "stake",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "decimals",
            "type": {
              "option": "u8"
            }
          }
        ]
      }
    },
    {
      "name": "PriceFeedInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "asset",
            "type": "publicKey"
          },
          {
            "name": "dataFeed",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidVaultMint",
      "msg": "Vault mint is invalid"
    },
    {
      "code": 6001,
      "name": "InvalidTokenAccount",
      "msg": "Invalid payer token account"
    },
    {
      "code": 6002,
      "name": "InvalidPriceFeed",
      "msg": "Provided price feed account is invalid"
    },
    {
      "code": 6003,
      "name": "InvalidChainlinkProgram",
      "msg": "Invalid Chainlink program account"
    },
    {
      "code": 6004,
      "name": "InvalidChainlinkFeed",
      "msg": "Invalid chainlink_feed account or payer_mint and chainlink_feed don't match"
    },
    {
      "code": 6005,
      "name": "MathOverflow",
      "msg": "Math operation overflow"
    },
    {
      "code": 6006,
      "name": "LessThanMinimalValue",
      "msg": "Payer value is less than minimal"
    },
    {
      "code": 6007,
      "name": "IvalidCollectedFundsAccount",
      "msg": "Collected funds account invalid"
    },
    {
      "code": 6008,
      "name": "InsufficientVaultBalance",
      "msg": "Amount of purchase is bigger than the amount in the treasury"
    },
    {
      "code": 6009,
      "name": "ConversionError",
      "msg": "Error occurred while converting mints"
    },
    {
      "code": 6010,
      "name": "PreSaleStillOn",
      "msg": "Pre-sale campaign has not ended"
    },
    {
      "code": 6011,
      "name": "PreSaleEnded",
      "msg": "Pre-sale campaign ended"
    }
  ]
};
