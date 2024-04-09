import { Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";

export const KEYPAIR_PATH = "/Users/yanmarinich/.config/solana/id.json";
export const PRIVATE_FOLDER_PATH = ".private";
// import { IDL } from "../types/pre_sale_program";

export const CLUSTER = import.meta.env.VITE_CLUSTER;

export const CLUSTER_URL =
  CLUSTER === "localnet"
    ? "http://localhost:8899"
    : clusterApiUrl(CLUSTER as any);

export const PROGRAM_ID = new PublicKey(
  "6cfTEqLuafN5gGVtqnbLwfdLJUXhqd2WnzRUMqAEej48",
);

// export const PROGRAM_IDL = IDL;

export const WSOL_ADDRESS = new PublicKey(
  "So11111111111111111111111111111111111111112",
);

export const USDT_ADDRESS = new PublicKey(
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
);

export const USDT_USD_FEED = new PublicKey(
  "8vAuuqC5wVZ9Z9oQUGGDSjYgudTfjmyqGU5VucQxTk5U",
);

export const CHAINLINK_PROGRAM_ID = new PublicKey(
  "HEvSKofvBgfaexv23kMabbYqxasxU3mQ4ibBMEmJWHny",
);
export const CHAINLINK_OFFCHAIN_PROGRAM_ID = new PublicKey(
  "cjg3oHmg9uuPsP8D6g29NWvhySJkdYdAo9D25PRbKXJ",
);

export const SOL_USD_FEED = new PublicKey(
  "CH31Xns5z3M1cTAbKW34jcxPPciazARpijcHj9rxtemt",
);

export const ETH_USD_FEED = "716hFAECqotxcXcj8Hs8nr7AG6q9dBw2oX3k3M8V7uGq";
export const BNB_USD_FEED = new PublicKey(
  "F6rApkRBD31K6zZrwXt8aQrRKwzbZqCMH2vbMvBgftPX",
);
export const USDC_USD_FEED = new PublicKey(
  "GzGuoKXE8Unn7Vcg1DtomwD27tL4bVUpSK2M1yk6Xfz5",
);

export const WSOL_DECIMALS = 9;
export const USDT_DECIMALS = 6;

// ----------------------------------------------

export const WSOL_DEV = new PublicKey(
  "So11111111111111111111111111111111111111112",
);
export const USDC_DEV = new PublicKey(
  "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr",
);

export const SOL_USD_FEED_DEV = new PublicKey(
  "99B2bTijsU6f1GCT73HmdR7HCFFjGMBcPZY6jZ96ynrR",
);

export const ETH_USD_FEED_DEV = new PublicKey(
  "669U43LNHx7LsVj95uYksnhXUfWKDsdzVqev3V4Jpw3P",
);
export const BTC_USD_FEED_DEV = new PublicKey(
  "6PxBx93S8x3tno1TsFZwT5VqP8drrRCbCXygEXYNkFJe",
);
export const USDC_USD_FEED_DEV = new PublicKey(
  "2EmfL3MqL3YHABudGNmajjCpR13NNEn9Y4LWxbDm6SwR",
);
export const USDT_USD_FEED_DEV = new PublicKey(
  "8QQSUPtdRTboa4bKyMftVNRfGFsB4Vp9d7r39hGKi53e",
);
export const keypair = Keypair.fromSecretKey(
  new Uint8Array([
    66, 113, 8, 97, 201, 68, 15, 110, 119, 129, 69, 67, 28, 209, 171, 247, 58,
    153, 122, 14, 242, 108, 71, 238, 147, 86, 168, 215, 24, 47, 142, 102, 214,
    35, 152, 27, 150, 103, 247, 189, 200, 72, 233, 5, 196, 95, 158, 162, 143,
    33, 227, 168, 161, 163, 52, 88, 179, 253, 109, 239, 186, 87, 251, 234,
  ]),
);
