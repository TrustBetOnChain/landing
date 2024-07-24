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
  const [loadingbalance, setloadingbalance] = useState(true);

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
      updateBalance();
    }
  }, [wallet, account]);

  // const hasWallet = connected && publicKey && anchorWallet?.publicKey;
  // const isBalanceShown = hasWallet && showBalance;

  // const label = hasWallet
  //   ? getTruncatedHash(publicKey.toString())
  //   : "Connect Wallet";

  async function updateBalance() {
    if (retryCountRef.current! === 0) {
      setloadingbalance(true)
    }
    // @ts-ignore
    const provider = new AnchorProvider(connection, wallet!, {});

    const program = new Program<PreSaleProgram>(
      PROGRAM_IDL,
      PRE_SALE_PROGRAM,
      provider,
    );
    const [userInfoAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("user_info"), new PublicKey(account)?.toBuffer()],
      program.programId,
    );
    // console.log(new PublicKey(account));
    try {
      const userInfo = await program.account.userInfo.fetch(userInfoAddress);
      setBalance(Number(userInfo.stake) / 10 ** vaultMintDecimals);
      console.log(userInfo);

      setloadingbalance(false)
    } catch (Err) {
      console.log({ Err });
      setloadingbalance(false)
      setBalance(0);
    }
  }
  const copyadd = () => {
    navigator.clipboard.writeText(account)
  }
  const onTransactionConfirmation = useCallback(() => {
    setIsConfirmationOpen(true);
    const id = setInterval(() => {

      if (retryCountRef.current <= 4) {
        updateBalance();
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
  }, [wallet, account]);
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
                  <div>{isConnected || sessionStorage.getItem("isConnected") ? loadingbalance ? <Spinner /> : balance : "Connect Wallet"}</div>
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


const Spinner = () => {
  return <div role="status">
    <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
}