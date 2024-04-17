import { clusterApiUrl } from "@solana/web3.js";

import { IDL } from "../types/pre_sale_program";
import { SupportedNetwork } from "../types";

export const CLUSTER = import.meta.env.VITE_CLUSTER as SupportedNetwork;

export const CLUSTER_URL = clusterApiUrl(CLUSTER);

export const PROGRAM_IDL = IDL;
