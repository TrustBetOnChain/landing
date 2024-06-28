import { RadioGroup } from "@headlessui/react";
import {
  ShieldCheckIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

import classNames from "classnames";
import { AnchorWallet, Wallet } from "@solana/wallet-adapter-react";
import TbetImage from "../../assets/tbet-icon.svg";
import {
  CHAINLINK_PROGRAM,
  PRE_SALE_PROGRAM,
  tokenVaultAddress,
  // tokens,
} from "../../presale/config/address";
import {
  Connection,
  PublicKey,
  Transaction,
  // Transaction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
// import { useTbetStake } from "../../hooks/use-tbet-balance";
import {
  CLUSTER,
  ENDPOINT,
  PROGRAM_IDL,
  connection,
  price,
  vaultMintDecimals,
} from "../../presale/config";
import { PrimaryButton } from "../primarybutton/primarybutton";
import { useWatch } from "react-hook-form";
import { SupportedToken } from "../../presale/types";
import { TextInput } from "../inputs/TextInput";
import { AnchorProvider, BN, Program } from "@coral-xyz/anchor";
import { PreSaleProgram } from "../../presale/types/pre_sale_program";
import { getPriceFeeds } from "../../presale/config/price-feed";
import { buyTokensInstruction } from "../../presale/instructions/buy-tokens";
// import { useEffect } from "react";
import { geTokenAddressWithCreationInstruction } from "../../util";
import { PriceForm, availableCoins, usePriceForm } from "./form";
// import { simulateTransaction } from "@coral-xyz/anchor/dist/cjs/utils/rpc";
import { TrustWalletName } from "@solana/wallet-adapter-wallets";
import { useState } from "react";
import usePhantomContext from "../../Context/usePhantomContext";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { toast } from "react-toastify";

interface Props {
  disconnect: () => void;
  onClose: () => void;
  onTransactionConfirmation: (sig: string) => void;
  wallet: Wallet;
  anchorWallet: AnchorWallet;
}

export const MyAccountModalContent: React.FC<Props> = ({
  disconnect,
  onClose,
  wallet,
  anchorWallet,
  onTransactionConfirmation,
}) => {
  console.log({ wallet });

  const [isLoading, setIsLoading] = useState(false);
  const { account, getProvider } = usePhantomContext();
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

  const submitHandler = (data: PriceForm) => {
    buyTokens(data.value, data.coin).then();
  };

  const buyTokens = async (amount: number, coin: SupportedToken) => {
    try {
      setIsLoading(true);
      const provider = new AnchorProvider(connection, anchorWallet, {});

      const program = new Program<PreSaleProgram>(
        PROGRAM_IDL,
        PRE_SALE_PROGRAM,
        provider,
      );

      const [programConfigAddress] = PublicKey.findProgramAddressSync(
        [Buffer.from("config")],
        program.programId,
      );

      const programConfig =
        await program.account.programConfig.fetch(programConfigAddress);

      const [vaultInfoAddress] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault_info")],
        program.programId,
      );

      const vaultInfo = await program.account.vaultInfo.fetch(vaultInfoAddress);

      const [userInfoAddress] = PublicKey.findProgramAddressSync(
        [Buffer.from("user_info"), new PublicKey(account)?.toBuffer()],
        program.programId,
      );

      console.log("vault", [
        Number(vaultInfo.stake) / 10 ** vaultMintDecimals,
        vaultInfo.decimals,
      ]);

      const feed = getPriceFeeds(CLUSTER)[coin];

      const [ataForPayment, paymentAtaCreationInstruction] =
        await geTokenAddressWithCreationInstruction(
          new PublicKey(account),
          feed.asset,
          connection,
          new PublicKey(account),
        );

      const [ataForCollecting, collectingAtaCreationInstruction] =
        await geTokenAddressWithCreationInstruction(
          programConfig.collectedFundsAccount,
          feed.asset,
          connection,
          new PublicKey(account),
        );

      const instruction = await buyTokensInstruction({
        accounts: {
          signer: new PublicKey(account),
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
        payerKey: new PublicKey(account),
        recentBlockhash: blockhash,
        instructions,
      }).compileToV0Message();

      const transactionV0 = new VersionedTransaction(messageV0);

      // // Simulate the versioned transaction
      // const simulateResult = await connection.simulateTransaction(transactionV0);

      // // Print the simulation result
      // console.log("Simulation Result:", simulateResult);

      const signedTx =
        wallet.adapter.name === TrustWalletName
          ? await signAndSendWithTrustWallet(transactionV0)
          : await sendTransaction(transactionV0);

      console.log(signedTx);
      onClose();
      onTransactionConfirmation(signedTx);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);

      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        console.log("An unknown error occurred:", err);
      }
    }
  };

  async function sendTransaction(tx: VersionedTransaction): Promise<string> {
    return wallet.adapter.sendTransaction(tx, connection);
  }

  async function signAndSendWithTrustWallet(
    tx: VersionedTransaction,
  ): Promise<string> {
    const signedTx = await anchorWallet.signTransaction(tx);

    return connection.sendTransaction(signedTx);
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
                            "relative block cursor-pointer rounded-lg border p-2 border-gray-300 focus:outline-none",
                          )
                        }
                      >
                        {({ checked }) => (
                          <>
                            <RadioGroup.Label
                              as="div"
                              className="text-base flex justify-between items-center font-medium text-white"
                            >
                              <span className="text-center p-2 flex-1">
                                {token.name}
                              </span>
                              <ArrowTopRightOnSquareIcon
                                height={16}
                                width={16}
                                className="flex-0 self-start"
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
                />
              </div>
              <div className="mt-6 flex gap-2 justify-center">
                <PrimaryButton className="w-[150px]">
                  {isLoading ? "Loading..." : "Buy"}
                </PrimaryButton>
                <PrimaryButton onClick={disconnect} className="w-[150px]">
                  Disconnect
                </PrimaryButton>
              </div>
              <div className="mt-6 text-center">
                <a
                  href="https://nft.assuredefi.com/?token=177"
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
