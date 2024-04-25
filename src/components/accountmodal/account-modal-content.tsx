import { RadioGroup } from "@headlessui/react";
import {
  ShieldCheckIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

import { CheckIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import TbetImage from "../../assets/tbet-icon.svg";
import {
  CHAINLINK_PROGRAM,
  PRE_SALE_PROGRAM,
  tokenVaultAddress,
  tokens,
} from "../../presale/config/address";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { useTbetStake } from "../../hooks/use-tbet-balance";
import { CLUSTER, PROGRAM_IDL, connection } from "../../presale/config";
import { PrimaryButton } from "../primarybutton/primarybutton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { SupportedToken } from "../../presale/types";
import { z } from "zod";
import { TextInput } from "../inputs/TextInput";
import { AnchorProvider, BN, Program, web3 } from "@coral-xyz/anchor";
import { PreSaleProgram } from "../../presale/types/pre_sale_program";
import { getPriceFeeds } from "../../presale/config/price-feed";
import { buyTokensInstruction } from "../../presale/instructions/buy-tokens";
import {
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { encode } from "bs58";

interface Props {
  onClose: () => void;
  wallet: AnchorWallet;
}

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

export const PriceSchema = z.object({
  coin: z.nativeEnum(Coin),
  value: z.number().min(1, { message: "Shouldn't be zero" }),
});

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

export const typeRadioOptions: RadioOption<Coin>[] = [
  { id: Coin.SOL, name: "SOL" },
  { id: Coin.ETH, name: "ETH" },
  { id: Coin.USDT, name: "USDT" },
  { id: Coin.USDC, name: "USDC" },
  { id: Coin.BTC, name: "BTC" },
];

const availableCoins = [Coin.SOL, Coin.ETH, Coin.BTC, Coin.USDC, Coin.USDT].map<
  RadioOption<Coin> & { address: PublicKey }
>((coin) => ({ id: coin, name: coin, address: tokens[CLUSTER][coin].pubkey }));

const [vaultAddress] = PublicKey.findProgramAddressSync(
  [Buffer.from("vault_info")],
  PRE_SALE_PROGRAM,
);

export const AccountModalContent: React.FC<Props> = ({ onClose, wallet }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = usePriceForm();

  const values = useWatch({
    control,
  });
  const price = 0.1;

  const vaultBalance = useTbetStake(vaultAddress, "vaultInfo", wallet);

  const submitHandler = (data: PriceForm) => {
    buyTokens(data.value, data.coin).then();
  };

  const buyTokens = async (amount: number, coin: SupportedToken) => {
    const provider = new AnchorProvider(connection, wallet, {});
    // const vaultAccount = await getAccount(connection, tokenVaultAddress);
    const vaultMintDecimals = 6;

    const program = new Program<PreSaleProgram>(
      PROGRAM_IDL,
      PRE_SALE_PROGRAM,
      provider,
    );

    let [programConfigAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      program.programId,
    );

    const programConfig =
      await program.account.programConfig.fetch(programConfigAddress);

    const [userInfoAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("user_info"), wallet.publicKey.toBuffer()],
      program.programId,
    );

    const feed = getPriceFeeds(CLUSTER)[coin];

    const [ataForPayment, paymentAtaCreationInstruction] =
      await geTokenAddressWithCreationInstruction(wallet.publicKey, feed.asset);

    const [ataForCollecting, collectingAtaCreationInstruction] =
      await geTokenAddressWithCreationInstruction(
        programConfig.collectedFundsAccount,
        feed.asset,
      );

    console.log("p", paymentAtaCreationInstruction);
    console.log("c", collectingAtaCreationInstruction);

    const instruction = await buyTokensInstruction({
      accounts: {
        signer: wallet.publicKey,
        programConfig: programConfigAddress,
        vaultAccount: tokenVaultAddress,
        userInfoAccount: userInfoAddress,
        payerTokenAccount: ataForPayment,
        collectedFundsTokenAccount: ataForCollecting,
        collectedFundsAccount: programConfig.collectedFundsAccount,
        payerMint: feed.asset,
        chainlinkFeed: feed.dataFeed,
        chainlinkProgram: CHAINLINK_PROGRAM,
      },
      args: { amount: new BN(amount * 10 ** vaultMintDecimals) },
      program,
    });

    const instructions = [];

    if (paymentAtaCreationInstruction) {
      instructions.push(paymentAtaCreationInstruction);
    }

    if (collectingAtaCreationInstruction) {
      instructions.push(collectingAtaCreationInstruction);
    }
    instructions.push(instruction);

    const { blockhash } = await connection.getLatestBlockhash();

    const messageV0 = new TransactionMessage({
      payerKey: wallet.publicKey,
      recentBlockhash: blockhash,
      instructions,
    }).compileToV0Message();

    // make a versioned transaction
    const transactionV0 = new VersionedTransaction(messageV0);

    try {
      const simulationResult =
        await connection.simulateTransaction(transactionV0);
      console.log(simulationResult);
    } catch (e) {
      console.log(e);
    }

    // return;

    const signedTx = await wallet.signTransaction(transactionV0);

    const res = await provider.sendAndConfirm(signedTx);
    console.log("result", res);
  };

  async function geTokenAddressWithCreationInstruction(
    address: PublicKey,
    mint: PublicKey,
  ): Promise<[PublicKey, TransactionInstruction | null]> {
    const ata = await getAssociatedTokenAddress(mint, address);
    let instruction: TransactionInstruction | null = null;

    try {
      await getAccount(connection, ata);
    } catch (e) {
      instruction = createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        ata,
        address,
        mint,
      );
    }

    return [ata, instruction];
  }

  return (
    <div className="relative flex w-full items-center overflow-hidden bg-[#1b2a28] rounded-lg px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
      <button
        type="button"
        className="absolute hover:bg-[#299c35] right-4 top-4 text-white hover:text-white sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="grid w-full grid-cols-1 items-center md:items-start gap-x-6 gap-y-8 md:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-8 md:col-span-4 lg:col-span-5">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden bg-gray-100">
            <img
              src={TbetImage}
              className="object-cover object-center bg-[#1b2a28]"
            />
          </div>
          <p className="absolute left-4 top-4 text-center sm:static sm:mt-6">
            <a
              href="https://solscan.io/token/xpFbKJa92Ee1NSYEhc3b3BVk4im8YStXRaVW6EoW33w"
              className="font-medium text-white flex justify-center items-center gap-1 hover:text-white"
              target="_blank"
            >
              View on Solscan
              <ArrowTopRightOnSquareIcon height={20} width={20} />
            </a>
          </p>
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <section aria-labelledby="information-heading" className="mt-4">
            <h3 id="information-heading" className="sr-only">
              Product information
            </h3>

            <div className="flex items-center">
              <p className="text-lg text-white sm:text-xl">Price: ${price}</p>

              {!!Number(vaultBalance) && (
                <div className="ml-4 flex border-l border-gray-300 pl-4">
                  <CheckIcon
                    className="h-5 w-5 flex-shrink-0"
                    aria-hidden="true"
                  />

                  <p className="ml-2 font-medium text-white">
                    {Number(vaultBalance) / 10 ** 6} available for purchase
                  </p>
                </div>
              )}
            </div>
          </section>

          <section aria-labelledby="options-heading" className="mt-6">
            <h3 id="options-heading" className="sr-only">
              Product options
            </h3>

            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="sm:flex sm:flex-col sm:justify-between">
                <RadioGroup
                  value={values.coin}
                  onChange={(coin) => {
                    setValue("coin", coin);
                  }}
                >
                  <RadioGroup.Label className="block mb-3 text-sm font-medium text-white">
                    Choose token for payment
                  </RadioGroup.Label>
                  <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {availableCoins.map((token) => (
                      <RadioGroup.Option
                        as="div"
                        key={token.name}
                        value={token.id}
                        className={({ active }) =>
                          classNames(
                            active ? "ring-2 ring-indigo-500" : "",
                            "relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none",
                          )
                        }
                      >
                        {({ checked }) => (
                          <>
                            <RadioGroup.Label
                              as="p"
                              className="text-base flex justify-center items-center gap-3 font-medium text-white"
                            >
                              {token.name}{" "}
                              <ArrowTopRightOnSquareIcon
                                height={16}
                                width={16}
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.open(
                                    `https://solscan.io/token/${token.address}${CLUSTER === "devnet" ? "?cluster=devnet" : ""}`,
                                    "_blank",
                                  );
                                }}
                              />
                            </RadioGroup.Label>
                            <div
                              className={classNames(
                                "border-2",
                                checked
                                  ? "border-[#219653]"
                                  : "border-transparent",
                                "pointer-events-none absolute -inset-px rounded-lg",
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>

                <TextInput
                  {...register("value", {
                    valueAsNumber: true,
                    required: true,
                    min: 1,
                    max: 10_000_000,
                  })}
                  error={errors.value}
                  label={`Amount of TrustBet tokens you want to purchase`}
                  className="mt-5 mb-5 sm:col-span-3"
                  type="number"
                />
              </div>
              {/* <div className="mt-4 flex">
                <a
                  href="#"
                  className="group flex text-sm text-gray-500 hover:text-gray-700"
                >
                  <span>What size should I buy?</span>
                  <QuestionMarkCircleIcon
                    className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </a>
              </div> */}
              <div className="mt-6 flex justify-center">
                <PrimaryButton className="w-[150px]">Buy</PrimaryButton>
              </div>
              <div className="mt-6 text-center">
                <a
                  href="https://content.assuredefi.com/verification-package-content/trustbet-on-chain"
                  className="group inline-flex text-base font-medium"
                  target="_blank"
                >
                  <ShieldCheckIcon
                    className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 group-hover:text-white">
                    Assure DeFi Verification
                  </span>
                </a>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
