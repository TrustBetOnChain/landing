import { getAccount } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";

export async function getTokenBalance(
  ata: PublicKey,
  connection: Connection,
): Promise<bigint> {
  const account = await getAccount(connection, new PublicKey(ata));

  return account.amount;
}
