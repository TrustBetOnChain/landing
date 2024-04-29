import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { PROGRAM_IDL, connection } from "../presale/config";
import { PRE_SALE_PROGRAM } from "../presale/config/address";
import { getTokenBalance } from "../util";
import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import { AnchorWallet, Wallet } from "@solana/wallet-adapter-react";
import { PreSaleProgram } from "../presale/types/pre_sale_program";

export function useTbetStake(
  accountAddress: PublicKey | null,
  type: "vaultInfo" | "userInfo",
  wallet: AnchorWallet | undefined,
  updateInterval: number = 5000,
): bigint {
  const [balance, setBalance] = useState<BN>(new BN(0));

  useEffect(() => {
    if (accountAddress && wallet) {
      const timer = setInterval(async () => {
        try {
          const provider = new AnchorProvider(connection, wallet, {});
          const program = new Program<PreSaleProgram>(
            PROGRAM_IDL,
            PRE_SALE_PROGRAM,
            provider,
          );
          const info = await program.account[type].fetch(accountAddress);
          setBalance(info.stake);
        } catch (e) {
          console.log(e);
          setBalance(new BN(0));
        }
      }, updateInterval);

      return () => {
        clearInterval(timer);
      };
    } else {
      setBalance(new BN(0));
    }
  }, [accountAddress, wallet]);

  return balance;
}
