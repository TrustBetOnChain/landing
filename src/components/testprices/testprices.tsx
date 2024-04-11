import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RadioButton } from "../inputs/RadioButton";
import { TextInput } from "../inputs/TextInput";
import { AnchorWallet } from "@solana/wallet-adapter-react";

import { useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";

import { PreSaleProgram } from "../../presale/types/pre_sale_program";
import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { PrimaryButton } from "../primarybutton/primarybutton";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import {
  CHAINLINK_PROGRAM,
  PRE_SALE_PROGRAM,
  tokens,
} from "../../presale/config/address";
import { PROGRAM_IDL } from "../../presale/config";
import { getPriceFeed } from "../../presale/config/price-feed";
import { SupportedToken } from "../../presale/types";

export type RadioOption<T extends string = string> = {
  id: T;
  name: string;
};

export const Coin = {
  SOL: "SOL",
  ETH: "ETH",
  BTC: "BTC",
  USDC: "USDC",
  USDT: "USDT",
} satisfies Record<SupportedToken, SupportedToken>;

export type Coin = (typeof Coin)[keyof typeof Coin];

Coin;

export const PriceSchema = z.object({
  coin: z.nativeEnum(Coin),
  value: z.number().min(0),
});

export type PriceForm = z.infer<typeof PriceSchema>;

const priceDefaultValues: Partial<PriceForm> = {
  coin: Coin.SOL,
  value: 0,
};

export function usePriceForm() {
  return useForm<PriceForm>({
    defaultValues: priceDefaultValues,
    resolver: zodResolver(PriceSchema),
  });
}

export const typeRadioOptions: RadioOption<Coin>[] = [
  { id: Coin.SOL, name: "SOL" },
  { id: Coin.ETH, name: "ETH" },
  { id: Coin.USDT, name: "USDT" },
  { id: Coin.USDC, name: "USDC" },
  { id: Coin.BTC, name: "BTC" },
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

  const vaultMintAddress = new PublicKey(
    "J6uwcX3KXnA7xJj1v2HZVGKgQpyvxk2mQmxMaBYhD7bF",
  );

  const { connection } = useConnection();
  const [tokenAmount, setTokenAmount] = useState(0);

  // useEffect(() => {
  //   connection
  //     .getParsedAccountInfo(vaultMintAddress)
  //     .then((vaultMint) => console.log(vaultMint));
  // }, []);

  useEffect(() => {
    setTokenAmount(0);
  }, [values.value, values.coin]);

  const submitHandler = (data: PriceForm) => {
    if (values.coin) {
      fetchPrice(data.value, values.coin);
    }
  };

  const fetchPrice = async (amount: number, coin: SupportedToken) => {
    const provider = new AnchorProvider(connection, wallet, {});

    const feedInfo = getPriceFeed(coin, "devnet");

    const program = new Program<PreSaleProgram>(
      PROGRAM_IDL,
      PRE_SALE_PROGRAM,
      provider,
    );

    let [programConfigAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      program.programId,
    );

    const result = await program.methods
      .getTokenAmount({ amount: new BN(`${amount * Math.pow(10, 6)}`) })
      .accounts({
        programConfig: programConfigAddress,
        vaultMint: vaultMintAddress,
        chainlinkProgram: CHAINLINK_PROGRAM,
        payerMint: feedInfo.asset,
        chainlinkFeed: feedInfo.dataFeed,
      })
      .view();

    const formattedResult =
      result.toNumber() / Math.pow(10, tokens.devnet[coin].decimals);

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
                legend="Choose coin that you wanna use for payment"
                description="Price will be estimated based on the selection (TBET price: $0.1)"
                className="col-span-full"
                {...register("coin")}
              />
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <TextInput
                {...register("value", { valueAsNumber: true })}
                error={errors.value}
                label={`Enter the amount of TBET you wanna buy`}
                className="sm:col-span-3"
                type="number"
              />
            </div>

            <div className="mt-5 text-md font-semibold leading-6 text-white">
              {values.coin} coins = {tokenAmount}
            </div>

            <PrimaryButton
              className="mt-4"
              icon={undefined}
              label="Estimate price"
            />
          </div>
        </div>
      </fieldset>
      <WalletDisconnectButton />
    </form>
  );
}
