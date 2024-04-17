import { Fragment, useEffect, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import {
  ShieldCheckIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import classNames from "classnames";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import TbetImage from "../../assets/tbet-icon.svg";
import {
  PRE_SALE_PROGRAM,
  tokenVaultAddress,
  tokens,
} from "../../presale/config/address";
import { PublicKey } from "@solana/web3.js";
import { useTbetBalance } from "../../hooks/use-tbet-balance";
import { CLUSTER, connection } from "../../presale/config";
import { PrimaryButton } from "../primarybutton/primarybutton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { SupportedToken } from "../../presale/types";
import { z } from "zod";
import { TextInput } from "../inputs/TextInput";

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

const availableCoins = [Coin.SOL, Coin.ETH, Coin.BTC, Coin.USDC, Coin.USDT].map<
  RadioOption<Coin> & { address: PublicKey }
>((coin) => ({ id: coin, name: coin, address: tokens[CLUSTER][coin].pubkey }));

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

  const vaultBalance = useTbetBalance(tokenVaultAddress);

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

            <form>
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
                  {...register("value", { valueAsNumber: true })}
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
              <div className="mt-6">
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
