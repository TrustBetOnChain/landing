import { Connection } from "@solana/web3.js";
import { CLUSTER_URL } from ".";

const getConnection = () => {
  return new Connection(CLUSTER_URL, "confirmed");
};

export const connection = getConnection();
