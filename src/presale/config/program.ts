import { Program, getProvider } from "@coral-xyz/anchor";
import { PROGRAM_IDL } from ".";
import { PreSaleProgram } from "../types/pre_sale_program";
import { PRE_SALE_PROGRAM } from "./address";

export const getProgram = () => {
  return new Program<PreSaleProgram>(
    PROGRAM_IDL,
    PRE_SALE_PROGRAM,
    getProvider(),
  );
};
