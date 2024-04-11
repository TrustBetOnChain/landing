import { clusterApiUrl } from "@solana/web3.js";

import { IDL } from "../types/pre_sale_program";

export const CLUSTER = import.meta.env.VITE_CLUSTER;

export const CLUSTER_URL =
  CLUSTER === "localnet"
    ? "http://localhost:8899"
    : clusterApiUrl(CLUSTER as any);

export const PROGRAM_IDL = IDL;
