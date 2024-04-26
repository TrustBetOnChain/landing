import { Connection } from "@solana/web3.js";
import { ENDPOINT } from "./vars";

const getConnection = () => {
  return new Connection(ENDPOINT, {
    commitment: "confirmed",
  });
};

export const connection = getConnection();
