import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RadioButton } from "../inputs/RadioButton";
import { TextInput } from "../inputs/TextInput";
import { AnchorWallet } from "@solana/wallet-adapter-react";

import { useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";

import {
  CHAINLINK_PROGRAM_ID,
  CLUSTER_URL,
  PROGRAM_ID,
  PROGRAM_IDL,
  SOL_USD_FEED_DEV,
  WSOL_DEV,
} from "../../presale/config";
import { PreSaleProgram } from "../../presale/types/pre_sale_program";
import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { PrimaryButton } from "../primarybutton/primarybutton";

export type RadioOption<T extends string = string> = {
  id: T;
  name: string;
};

export const Coin = {
  WSOL: "WSOL",
  ETH: "ETH",
  BTC: "BTC",
  USDC: "USDC",
  USDT: "USDT",
} as const;

export type Coin = (typeof Coin)[keyof typeof Coin];

export const PriceSchema = z.object({
  coin: z.nativeEnum(Coin),
  value: z.number().min(0),
});

export type PriceForm = z.infer<typeof PriceSchema>;

const priceDefaultValues: Partial<PriceForm> = {
  coin: Coin.WSOL,
  value: 0,
};

export function usePriceForm() {
  return useForm<PriceForm>({
    defaultValues: priceDefaultValues,
    resolver: zodResolver(PriceSchema),
  });
}

export const typeRadioOptions: RadioOption<Coin>[] = [
  { id: Coin.WSOL, name: "SOL" },
  // { id: Coin.ETH, name: "ETH" },
  // { id: Coin.USDT, name: "USDT" },
  // { id: Coin.USDC, name: "USDC" },
  // { id: Coin.BTC, name: "BTC" },
];

export function TestPrices({ wallet }: { wallet: AnchorWallet }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = usePriceForm();

  const values = useWatch({
    control,
  });

  const { connection } = useConnection();
  const [tokenAmount, setTokenAmount] = useState(0);

  useEffect(() => {
    setTokenAmount(0);
  }, [values.value, values.coin]);

  const submitHandler = (data: PriceForm) => {
    fetchPrice(data.value);
  };

  const fetchPrice = async (amount: number) => {
    const provider = new AnchorProvider(connection, wallet, {});

    const program = new Program<PreSaleProgram>(
      PROGRAM_IDL,
      PROGRAM_ID,
      provider,
    );

    const vaultMint = new PublicKey(
      "J6uwcX3KXnA7xJj1v2HZVGKgQpyvxk2mQmxMaBYhD7bF",
    );

    let [programConfigAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      program.programId,
    );

    const result = await program.methods
      .getTokenAmount({
        payerMintAmount: new BN(amount * Math.pow(10, 9)),
      })
      .accounts({
        programConfig: programConfigAddress,
        vaultMint: vaultMint,
        chainlinkProgram: CHAINLINK_PROGRAM_ID,
        payerMint: WSOL_DEV,
        chainlinkFeed: SOL_USD_FEED_DEV,
      })
      .view();

    const formattedResult = result.toNumber() / Math.pow(10, 6);

    setTokenAmount(formattedResult);
  };

  return (
    <form className="flex-1" onSubmit={handleSubmit(submitHandler)}>
      <fieldset>
        <div className="mx-auto max-w-[800px] space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <RadioButton
                options={typeRadioOptions}
                legend="Choose coin"
                description="Price will be estimated based on the selection (TBET price: $0.1)"
                className="col-span-full"
                {...register("coin")}
              />
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <TextInput
                {...register("value", { valueAsNumber: true })}
                error={errors.value}
                label={`Enter the amount of ${values.coin} you wanna spend for TBET`}
                className="sm:col-span-3"
                type="number"
                step="0.000001"
              />
            </div>

            <div className="mt-5 text-md font-semibold leading-6 text-white">
              TBET coins = {tokenAmount}
            </div>

            <PrimaryButton
              className="mt-4"
              icon={undefined}
              label="Estimate price"
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
}
