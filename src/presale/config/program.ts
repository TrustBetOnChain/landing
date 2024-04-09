import { AnchorProvider, Program, getProvider } from "@coral-xyz/anchor";
import { PROGRAM_ID, PROGRAM_IDL, getConnection } from ".";
import { PreSaleProgram } from "../types/pre_sale_program";

export const getProgram = () => {
  return new Program<PreSaleProgram>(PROGRAM_IDL, PROGRAM_ID, getProvider());
};
