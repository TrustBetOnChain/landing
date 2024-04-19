import { Connection } from "@solana/web3.js";
import { CLUSTER_URL } from ".";

const getConnection = () => {
  return new Connection(CLUSTER_URL, {
    commitment: "confirmed",
    // confirmTransactionInitialTimeout: 70 * 1000,
  });
};

export const connection = getConnection();
