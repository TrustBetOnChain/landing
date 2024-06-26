/* eslint-disable prettier/prettier */
import ConnectWalletImg from "../../assets/imgs/connect-wallet.svg";
import { PrimaryButton } from "../primarybutton/primarybutton";
import { useCallback, useEffect, useState } from "react";
import { AccountModal } from "../accountmodal/accountmodal";
import { getTruncatedHash } from "../../util";

import s from "./connectwallet.module.scss";
// import { useTbetStake } from "../../hooks/use-tbet-balance";
import { PublicKey } from "@solana/web3.js";
import { PRE_SALE_PROGRAM } from "../../presale/config/address";
import TBetIcon from "../../assets/imgs/t-bet-icon.svg";
import {
  useUnifiedWalletContext,
  useUnifiedWallet,
} from "@jup-ag/wallet-adapter";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { PreSaleProgram } from "../../presale/types/pre_sale_program";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import {
  PROGRAM_IDL,
  connection,
  vaultMintDecimals,
} from "../../presale/config";
import { ConfirmationModal } from "../confirmationmodal/confirmation.modal";
import usePhantomContext from "../../Context/usePhantomContext";
import { MyAccountModal } from "../accountmodal/myaccountmodal";

export const ConnectModal = ({
  className,
  onClick,
  showBalance = false,
}: {
  className?: string;
  onClick?: () => void;
  showBalance?: boolean;
}) => {
  const {
    getProvider,
    account,
    isConnected,
    Connect,
    getBalance,
    provider,
    DisConnect,
  } = usePhantomContext()
  const [balance, setBalance] = useState()
  const showbalance = async () => {
    setBalance(await getBalance())
  }
  useEffect(() => {
    if ((account)) {
      showbalance()
    }
  }, [account])

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  // const [balance, setBalance] = useState(0);

  // const { setShowModal } = useUnifiedWalletContext();
  // const { connect, connected, publicKey } = useUnifiedWallet();

  // const anchorWallet = useAnchorWallet();

  // const handleClick = useCallback(async () => {
  //   onClick?.();

  //   connected ? openAccountModal() : setShowModal(true);
  // }, [anchorWallet, connect]);

  const openAccountModal = () => {
    setIsAccountOpen(true);
  };

  // useEffect(() => {
  //   if (anchorWallet?.publicKey && showBalance) {
  //     updateBalance(anchorWallet);
  //   }
  // }, [anchorWallet?.publicKey]);

  // const hasWallet = connected && publicKey && anchorWallet?.publicKey;
  // const isBalanceShown = hasWallet && showBalance;

  // const label = hasWallet
  //   ? getTruncatedHash(publicKey.toString())
  //   : "Connect Wallet";

  // async function updateBalance(wallet: AnchorWallet) {
  //   const provider = new AnchorProvider(connection, wallet, {});

  //   const program = new Program<PreSaleProgram>(
  //     PROGRAM_IDL,
  //     PRE_SALE_PROGRAM,
  //     provider,
  //   );

  //   const [userInfoAddress] = PublicKey.findProgramAddressSync(
  //     [Buffer.from("user_info"), wallet.publicKey.toBuffer()],
  //     program.programId,
  //   );
  //   try {
  //     const userInfo = await program.account.userInfo.fetch(userInfoAddress);
  //     setBalance(Number(userInfo.stake) / 10 ** vaultMintDecimals);
  //   } catch {
  //     setBalance(0);
  //   }
  // }
  return (
    <>
      <div className={className}>
        <PrimaryButton onClick={() => isConnected ? openAccountModal() : Connect()} >
          <div className={s.account}>
            <div>{isConnected ? `${getTruncatedHash(account)}` : "Connect Wallet"}</div>
            <img className="pb-1 ml-2" src={ConnectWalletImg} alt="" />
          </div>
        </PrimaryButton>
        {isConnected && balance && (
          <PrimaryButton
            onClick={() => {
              showbalance()
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
