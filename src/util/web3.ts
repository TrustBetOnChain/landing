import {
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";

export async function getTokenBalance(
  ata: PublicKey,
  connection: Connection,
): Promise<bigint> {
  const account = await getAccount(connection, new PublicKey(ata));

  return account.amount;
}

export async function geTokenAddressWithCreationInstruction(
  address: PublicKey,
  mint: PublicKey,
  connection: Connection,
): Promise<[PublicKey, TransactionInstruction | null]> {
  const ata = await getAssociatedTokenAddress(mint, address);
  let instruction: TransactionInstruction | null = null;

  try {
    await getAccount(connection, ata);
  } catch (e) {
    instruction = createAssociatedTokenAccountInstruction(
      address,
      ata,
      address,
      mint,
    );
  }

  return [ata, instruction];
}
