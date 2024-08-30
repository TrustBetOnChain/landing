import { clusterApiUrl } from "@solana/web3.js";

import { IDL } from "../types/pre_sale_program";
import { SupportedNetwork } from "../types";

// export const CLUSTER = import.meta.env.VITE_STAGING_CLUSTER as SupportedNetwork;
// export const CLUSTER = import.meta.env.VITE_CLUSTER as SupportedNetwork;
export const CLUSTER = "mainnet-beta" as SupportedNetwork;

export const PROGRAM_IDL = IDL;

export const PRIVATE_MAINNET_CLUSTER_URL =
  "https://solana-mainnet.g.alchemy.com/v2/DBnynQyLa1gy-Mp2Xu1TjwlkQTfrDZMQ";

export const ENDPOINT =
  CLUSTER === "devnet" ? clusterApiUrl(CLUSTER) : PRIVATE_MAINNET_CLUSTER_URL;

export const price = 0.1;
export const vaultMintDecimals = 6;
