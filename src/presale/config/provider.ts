import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { getConnection } from "./connection";

export const getProvider = (wallet: Wallet) => {
  const connection = getConnection();

  return new AnchorProvider(connection, wallet, {
    preflightCommitment: "confirmed",
  });
};
