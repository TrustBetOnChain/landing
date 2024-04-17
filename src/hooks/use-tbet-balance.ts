import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { connection } from "../presale/config";
import { PRE_SALE_PROGRAM } from "../presale/config/address";
import { getTokenBalance } from "../util";

export function useTbetBalance(
  accountAddress: PublicKey | null,
  updateInterval: number = 5000,
): bigint {
  const [balance, setBalance] = useState(0n);

  useEffect(() => {
    if (accountAddress) {
      const timer = setInterval(async () => {
        try {
          const balance = await getTokenBalance(accountAddress, connection);

          setBalance(balance);
        } catch (e) {
          setBalance(0n);
        }
      }, updateInterval);

      return () => {
        clearInterval(timer);
      };
    }
  }, [accountAddress]);

  return balance;
}
