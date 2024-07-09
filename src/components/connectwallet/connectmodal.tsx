/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */

import ConnectWalletImg from "../../assets/imgs/connect-wallet.svg";
import { PrimaryButton } from "../primarybutton/primarybutton";
import { useEffect, useState } from "react";
import { getTruncatedHash } from "../../util";

import s from "./connectwallet.module.scss";
// import { useTbetStake } from "../../hooks/use-tbet-balance";
import TBetIcon from "../../assets/imgs/t-bet-icon.svg";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ConfirmationModal } from "../confirmationmodal/confirmation.modal";
import usePhantomContext from "../../Context/usePhantomContext";
import { MyAccountModal } from "../accountmodal/myaccountmodal";
import { connection, PROGRAM_IDL, vaultMintDecimals } from "../../presale/config";
import { PRE_SALE_PROGRAM } from "../../presale/config/address";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PreSaleProgram } from "../../presale/types/pre_sale_program";
import { AnchorWallet, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export const ConnectModal = ({
  className,
}: {
  className?: string;
  onClick?: () => void;
  showBalance?: boolean;
}) => {
  const {
    // @ts-ignore
    account,
    // @ts-ignore
    isConnected,
    // @ts-ignore
    Connect,
    // @ts-ignore
    getBalance,
  } = usePhantomContext()
  console.log(({
    account,
    // @ts-ignore
    isConnected,
    // @ts-ignore
    Connect,
  }));

  // const [balance, setBalance] = useState()
  // const showbalance = async () => {
  //   setBalance(await getBalance())
  // }
  // useEffect(() => {
  //   if ((account)) {
  //     showbalance()
  //   }
  // }, [account])

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [balance, setBalance] = useState(0);


  // const { setShowModal } = useUnifiedWalletContext();
  // const { connect, connected, publicKey } = useUnifiedWallet();

  const anchorWallet = useAnchorWallet();
  const { wallet } = useWallet()

  // const handleClick = useCallback(async () => {
  //   onClick?.();

  //   connected ? openAccountModal() : setShowModal(true);
  // }, [anchorWallet, connect]);

  const openAccountModal = () => {
    setIsAccountOpen(true);
  };
  console.log({ wallet: wallet });

  useEffect(() => {
    if (wallet && account) {
      updateBalance(wallet,);
    }
  }, [wallet, account]);

  // const hasWallet = connected && publicKey && anchorWallet?.publicKey;
  // const isBalanceShown = hasWallet && showBalance;

  // const label = hasWallet
  //   ? getTruncatedHash(publicKey.toString())
  //   : "Connect Wallet";

  async function updateBalance(wallet: any) {
    const provider = new AnchorProvider(connection, wallet, {});

    const program = new Program<PreSaleProgram>(
      PROGRAM_IDL,
      PRE_SALE_PROGRAM,
      provider,
    );
    const [userInfoAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("user_info"), new PublicKey(account)?.toBuffer()],
      program.programId,
    );
    console.log(new PublicKey(account));

    try {
      const userInfo = await program.account.userInfo.fetch(userInfoAddress);
      setBalance(Number(userInfo.stake) / 10 ** vaultMintDecimals);
    } catch (Err) {
      console.log(Err);
      setBalance(0);
    }
  }
  return (
    <>
      <div className={className}>
        <PrimaryButton onClick={() => isConnected ? openAccountModal() : Connect()} >
          <div className={s.account}>
            <div>{isConnected ? `${getTruncatedHash(account)}` : "Connect Wallet"}</div>
            <img className="pb-1 ml-2" src={ConnectWalletImg} alt="" />
          </div>
        </PrimaryButton>
        {isConnected && (
          <PrimaryButton
            onClick={() => {
              updateBalance(anchorWallet!).then()
            }}
          >
            <img height={28} width={28} src={TBetIcon} />
            {balance}
            <ArrowPathIcon className="h-6 w-6text-white" aria-hidden="true" />
          </PrimaryButton>
        )}
      </div>

      <MyAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onTransactionConfirmation={() => setIsConfirmationOpen(true)}
      />
      {/*
       */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      />
    </>
  );
};
