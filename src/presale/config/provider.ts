import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { connection } from "./connection";

export const getProvider = (wallet: Wallet) => {
  return new AnchorProvider(connection, wallet, {
    preflightCommitment: "confirmed",
  });
};
