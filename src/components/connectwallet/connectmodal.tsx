/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */

import ConnectWalletImg from "../../assets/imgs/connect-wallet.svg";
import CPYICON from "../../assets/imgs/copy-icon.svg";
import TEBTDOLLAR from "../../assets/imgs/tbeticondollar.svg";
import { PrimaryButton } from "../primarybutton/primarybutton";
import { useCallback, useEffect, useRef, useState } from "react";
import { getTruncatedHash } from "../../util";
import "./index.css"
import s from "./connectwallet.module.scss";
import TBetIcon from "../../assets/imgs/t-bet-icon.svg";

import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConfirmationModal } from "../confirmationmodal/confirmation.modal";
import usePhantomContext from "../../Context/usePhantomContext";
import { MyAccountModal } from "../accountmodal/myaccountmodal";
import { connection, PROGRAM_IDL, vaultMintDecimals } from "../../presale/config";
import { PRE_SALE_PROGRAM } from "../../presale/config/address";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PreSaleProgram } from "../../presale/types/pre_sale_program";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import ConnectWalletmodalPopup from "../connectwalletmodalpopup/ConnectWalletmodalPopup";
import { Menu } from "@headlessui/react";

export const ConnectModal = ({
  className,
}: {
  className?: string;
  onClick?: () => void;
  isShowBalance?: boolean;
}) => {
  const {
    // @ts-ignore
    account,
    // @ts-ignore
    setAccount,
    // @ts-ignore
    balance,
    // @ts-ignore
    setBalance,
    // @ts-ignore
    isConnected,
    // @ts-ignore
    DisConnect
  } = usePhantomContext()
  const [isOpen, setOpen] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const intervalIdRef = useRef(null);
  const retryCountRef = useRef(retryCount);
  // const { setShowModal } = useUnifiedWalletContext();
  // const { connect, connected, publicKey } = useUnifiedWallet();

  const anchorWallet = useAnchorWallet();
  const { wallet, publicKey } = useWallet()
  useEffect(() => {
    if (publicKey) {
      setAccount(publicKey.toString());
    }
  }, [publicKey])

  // const handleClick = useCallback(async () => {
  //   onClick?.();

  //   connected ? openAccountModal() : setShowModal(true);
  // }, [anchorWallet, connect]);

  const openAccountModal = () => {
    setIsAccountOpen(true);
  };

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
    console.log(program);

    const [userInfoAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("user_info"), new PublicKey(account)?.toBuffer()],
      program.programId,
    );
    // console.log(new PublicKey(account));

    try {
      const userInfo = await program.account.userInfo.fetch(userInfoAddress);
      setBalance(Number(userInfo.stake) / 10 ** vaultMintDecimals);
    } catch (Err) {
      console.log(Err);
      setBalance(0);
    }
  }
  const copyadd = () => {
    navigator.clipboard.writeText(account)
  }
  const onTransactionConfirmation = useCallback(() => {
    setIsConfirmationOpen(true);
    const id = setInterval(() => {

      if (retryCountRef.current <= 6) {
        updateBalance(wallet);
        console.log({ retryCount: retryCountRef.current });

        setRetryCount(prev => {
          retryCountRef.current = prev + 1;
          return retryCountRef.current;
        });
      } else {
        setRetryCount(0)
        retryCountRef.current = 0;
        clearInterval(intervalIdRef.current!);
        intervalIdRef.current = null;
      }
    }, 2000);
    // @ts-ignore
    intervalIdRef.current = id;
  }, [wallet]);
  return (
    <>
      <div className={className}>
        {
          isConnected || sessionStorage.getItem("isConnected") ? (
            <Menu >
              <Menu.Button className={s["primarybbtn"]}  >
                <div className={s.account}>
                  {/* <img className="pb-1 " src={ConnectWalletImg} alt="" /> */}
                  <img height={28} width={28} src={TBetIcon} />
                  <div>{isConnected || sessionStorage.getItem("isConnected") ? balance : "Connect Wallet"}</div>
                  <div className="w-4 h-4">
                    <ChevronDownIcon className="size-4 fill-white" />
                  </div>
                </div>
              </Menu.Button >
              <Menu.Items
                className=" dropdownmnu w-52 origin-top-right rounded-xl p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] "
              >
                <Menu.Item>
                  <button onClick={openAccountModal} className="group flex w-full items-center gap-2 max-sm:text-[18px] text-[20px]  mybutton rounded-lg max-sm:py-4 py-1.5 px-3 data-[focus]:bg-white/10">
                    <img src={TEBTDOLLAR} />
                    Buy TBET
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘E</kbd>
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button onClick={copyadd} className="group  flex w-full items-center gap-2 max-sm:text-[18px] text-[20px] max-sm:py-4  mybutton rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <img src={CPYICON} />
                    {`${getTruncatedHash(account || publicKey?.toString(), 4)}`}
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button onClick={DisConnect} className="group border-none flex w-full items-center gap-2 max-sm:text-[18px] text-[20px] max-sm:py-4 mybutton rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <XMarkIcon className="size-6 fill-white" />
                    Disconnect
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <PrimaryButton onClick={() => isConnected ? openAccountModal() : setOpen(true)} >
              <div className={s.account}>
                <img className="" src={ConnectWalletImg} alt="" />
                <p className="max-sm:hidden text-[24px] whitespace-nowrap  max-2xl:text-[18px]">{"Connect Wallet"}</p>
              </div>
            </PrimaryButton>
          )
        }
        {/* {isConnected && isShowBalance && (
          <PrimaryButton
            onClick={() => {
              updateBalance(anchorWallet!).then()
            }}
          >
            <img height={28} width={28} src={TBetIcon} />
            {balance}
            <ArrowPathIcon className="h-6 w-6text-white" aria-hidden="true" />
          </PrimaryButton>
        )} */}
      </div>

      <MyAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onTransactionConfirmation={onTransactionConfirmation}
      />
      {/*
       */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      />
      <ConnectWalletmodalPopup isOpen={isOpen} onClose={() => setOpen(false)} />
    </>
  );
};
