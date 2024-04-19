import { clusterApiUrl } from "@solana/web3.js";

import { IDL } from "../types/pre_sale_program";
import { SupportedNetwork } from "../types";

export const CLUSTER = import.meta.env.VITE_CLUSTER as SupportedNetwork;

export const CLUSTER_URL =
  "https://solana-devnet.g.alchemy.com/v2/4H1ZANmIRoOT2pOABhNdplvUVkL6-1W8";

export const PROGRAM_IDL = IDL;
