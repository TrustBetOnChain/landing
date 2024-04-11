export type PreSaleProgram = {
  version: "0.1.0";
  name: "pre_sale_program";
  instructions: [
    {
      name: "initializeProgramConfig";
      accounts: [
        {
          name: "programConfig";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vaultAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "collectedFundsAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "chainlinkProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: "updateProgramConfig";
      accounts: [
        {
          name: "programConfig";
          isMut: true;
          isSigner: false;
        },
        {
          name: "admin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: "UpdateProgramConfigArgs";
          };
        },
      ];
    },
    {
      name: "getTokenAmount";
      accounts: [
        {
          name: "programConfig";
          isMut: false;
          isSigner: false;
        },
        {
          name: "vaultMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "payerMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "chainlinkFeed";
          isMut: false;
          isSigner: false;
        },
        {
          name: "chainlinkProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: "GetTokenAmountArgs";
          };
        },
      ];
      returns: "u64";
    },
    {
      name: "buyTokens";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "programConfig";
          isMut: false;
          isSigner: false;
        },
        {
          name: "vaultAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userVaultAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "payerTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "collectedFundsAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "vaultMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "payerMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "chainlinkFeed";
          isMut: false;
          isSigner: false;
        },
        {
          name: "chainlinkProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "args";
          type: {
            defined: "BuyTokensArgs";
          };
        },
      ];
    },
    {
      name: "getDataFeed";
      accounts: [
        {
          name: "chainlinkFeed";
          isMut: false;
          isSigner: false;
        },
        {
          name: "chainlinkProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
      returns: {
        defined: "DataFeed";
      };
    },
  ];
  accounts: [
    {
      name: "programConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            type: "publicKey";
          },
          {
            name: "collectedFundsAccount";
            type: "publicKey";
          },
          {
            name: "chainlinkProgram";
            type: "publicKey";
          },
          {
            name: "hasPresaleEnded";
            type: "bool";
          },
          {
            name: "usdPrice";
            type: "u64";
          },
          {
            name: "usdDecimals";
            type: "u8";
          },
          {
            name: "feeds";
            type: {
              vec: {
                defined: "PriceFeedInfo";
              };
            };
          },
        ];
      };
    },
  ];
  types: [
    {
      name: "BuyTokensArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "payerMintAmount";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "GetTokenAmountArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "amount";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "UpdateProgramConfigArgs";
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "feeds";
            type: {
              option: {
                vec: {
                  defined: "PriceFeedInfo";
                };
              };
            };
          },
          {
            name: "hasPresaleEnded";
            type: {
              option: "bool";
            };
          },
          {
            name: "usdPrice";
            type: {
              option: "u64";
            };
          },
          {
            name: "usdDecimals";
            type: {
              option: "u8";
            };
          },
          {
            name: "collectedFundsAccount";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "chainlinkProgram";
            type: {
              option: "publicKey";
            };
          },
        ];
      };
    },
    {
      name: "PriceFeedInfo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "asset";
            type: "publicKey";
          },
          {
            name: "dataFeed";
            type: "publicKey";
          },
        ];
      };
    },
    {
      name: "DataFeed";
      type: {
        kind: "struct";
        fields: [
          {
            name: "value";
            type: "i128";
          },
          {
            name: "description";
            type: "string";
          },
          {
            name: "decimals";
            type: "u8";
          },
        ];
      };
    },
  ];
  errors: [
    {
      code: 6000;
      name: "InvalidVaultMint";
      msg: "Vault mint is invalid";
    },
    {
      code: 6001;
      name: "InvalidTokenAccount";
      msg: "Invalid payer token account";
    },
    {
      code: 6002;
      name: "InvalidTokenAmount";
      msg: "Token amount should be greater than 0";
    },
    {
      code: 6003;
      name: "InvalidPriceFeed";
      msg: "Provided price feed account is invalid";
    },
    {
      code: 6004;
      name: "InvalidChainlinkProgram";
      msg: "Invalid Chainlink program account";
    },
    {
      code: 6005;
      name: "InvalidChainlinkFeed";
      msg: "Invalid chainlink_feed account or payer_mint and chainlink_feed don't match";
    },
    {
      code: 6006;
      name: "MathOverflow";
      msg: "Math operation overflow";
    },
    {
      code: 6007;
      name: "LessThanMinimalValue";
      msg: "Payer value is less than minimal";
    },
  ];
};

export const IDL: PreSaleProgram = {
  version: "0.1.0",
  name: "pre_sale_program",
  instructions: [
    {
      name: "initializeProgramConfig",
      accounts: [
        {
          name: "programConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "vaultAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collectedFundsAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "chainlinkProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "updateProgramConfig",
      accounts: [
        {
          name: "programConfig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "UpdateProgramConfigArgs",
          },
        },
      ],
    },
    {
      name: "getTokenAmount",
      accounts: [
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "vaultMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payerMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "chainlinkFeed",
          isMut: false,
          isSigner: false,
        },
        {
          name: "chainlinkProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "GetTokenAmountArgs",
          },
        },
      ],
      returns: "u64",
    },
    {
      name: "buyTokens",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "programConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "vaultAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userVaultAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payerTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "collectedFundsAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "vaultMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "payerMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "chainlinkFeed",
          isMut: false,
          isSigner: false,
        },
        {
          name: "chainlinkProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "args",
          type: {
            defined: "BuyTokensArgs",
          },
        },
      ],
    },
    {
      name: "getDataFeed",
      accounts: [
        {
          name: "chainlinkFeed",
          isMut: false,
          isSigner: false,
        },
        {
          name: "chainlinkProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      returns: {
        defined: "DataFeed",
      },
    },
  ],
  accounts: [
    {
      name: "programConfig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "admin",
            type: "publicKey",
          },
          {
            name: "collectedFundsAccount",
            type: "publicKey",
          },
          {
            name: "chainlinkProgram",
            type: "publicKey",
          },
          {
            name: "hasPresaleEnded",
            type: "bool",
          },
          {
            name: "usdPrice",
            type: "u64",
          },
          {
            name: "usdDecimals",
            type: "u8",
          },
          {
            name: "feeds",
            type: {
              vec: {
                defined: "PriceFeedInfo",
              },
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "BuyTokensArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "payerMintAmount",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "GetTokenAmountArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "amount",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "UpdateProgramConfigArgs",
      type: {
        kind: "struct",
        fields: [
          {
            name: "admin",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "feeds",
            type: {
              option: {
                vec: {
                  defined: "PriceFeedInfo",
                },
              },
            },
          },
          {
            name: "hasPresaleEnded",
            type: {
              option: "bool",
            },
          },
          {
            name: "usdPrice",
            type: {
              option: "u64",
            },
          },
          {
            name: "usdDecimals",
            type: {
              option: "u8",
            },
          },
          {
            name: "collectedFundsAccount",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "chainlinkProgram",
            type: {
              option: "publicKey",
            },
          },
        ],
      },
    },
    {
      name: "PriceFeedInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "asset",
            type: "publicKey",
          },
          {
            name: "dataFeed",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "DataFeed",
      type: {
        kind: "struct",
        fields: [
          {
            name: "value",
            type: "i128",
          },
          {
            name: "description",
            type: "string",
          },
          {
            name: "decimals",
            type: "u8",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidVaultMint",
      msg: "Vault mint is invalid",
    },
    {
      code: 6001,
      name: "InvalidTokenAccount",
      msg: "Invalid payer token account",
    },
    {
      code: 6002,
      name: "InvalidTokenAmount",
      msg: "Token amount should be greater than 0",
    },
    {
      code: 6003,
      name: "InvalidPriceFeed",
      msg: "Provided price feed account is invalid",
    },
    {
      code: 6004,
      name: "InvalidChainlinkProgram",
      msg: "Invalid Chainlink program account",
    },
    {
      code: 6005,
      name: "InvalidChainlinkFeed",
      msg: "Invalid chainlink_feed account or payer_mint and chainlink_feed don't match",
    },
    {
      code: 6006,
      name: "MathOverflow",
      msg: "Math operation overflow",
    },
    {
      code: 6007,
      name: "LessThanMinimalValue",
      msg: "Payer value is less than minimal",
    },
  ],
};
