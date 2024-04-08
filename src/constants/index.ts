import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

export const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
export const WALLETCONNECT_PROJECT_ID = import.meta.env
  .VITE_WALLETCONNECT_PROJECT_ID;

export const ORIGIN = `https://${ENVIRONMENT === "staging" ? "staging." : ""}trustbetonchain.com/`;
export const NETWORK =
  ENVIRONMENT === "staging"
    ? WalletAdapterNetwork.Devnet
    : WalletAdapterNetwork.Mainnet;
