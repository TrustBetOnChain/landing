import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Coin } from "../enum";
import { PublicKey } from "@solana/web3.js";
import { tokens } from "../../../presale/config/address";
import { CLUSTER } from "../../../presale/config/vars";

export const PriceSchema = z.object({
  coin: z.nativeEnum(Coin),
  value: z
    .number({
      required_error: "Token value is required. ",
    })
    .min(1, { message: "Token should be minimum 1." })
});

export type RadioOption<T extends string = string> = {
  id: T;
  name: string;
};

export type PriceForm = z.infer<typeof PriceSchema>;

const priceDefaultValues: Partial<PriceForm> = {
  coin: Coin.SOL,
  value: 1,
};

export function usePriceForm() {
  return useForm<PriceForm>({
    defaultValues: priceDefaultValues,
    resolver: zodResolver(PriceSchema),
  });
}

export const availableCoins = [Coin.SOL, Coin.USDC, Coin.USDT].map<
  RadioOption<Coin> & { address: PublicKey }
>((coin) => ({
  id: coin,
  name: coin,
  address: tokens?.[CLUSTER]?.[coin]?.pubkey,
}));
