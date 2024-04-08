import { useEffect, useState } from "react";
import { PreSaleProgram } from "../presale/types/pre_sale_program";

export const useProgram = (newProgram: PreSaleProgram) => {
  const [program, setProgram] = useState(newProgram);

  useEffect(() => {
    setProgram(newProgram);
  }, [newProgram]);
  return { program };
};
