/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */

import ConnectWalletImg from "../../assets/imgs/connect-wallet.svg";
import { PrimaryButton } from "../primarybutton/primarybutton";
import { useEffect, useState } from "react";
import { getTruncatedHash } from "../../util";
import "./index.css"
import s from "./connectwallet.module.scss";
// import { useTbetStake } from "../../hooks/use-tbet-balance";
import TBetIcon from "../../assets/imgs/t-bet-icon.svg";

import { ArrowPathIcon, ChevronDownIcon, PencilIcon, Square2StackIcon, XMarkIcon } from "@heroicons/react/24/outline";
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
  isShowBalance = true
}: {
  className?: string;
  onClick?: () => void;
  isShowBalance?: boolean;
}) => {
  const {
    // @ts-ignore
    account,
    // @ts-ignore
    isConnected,
    // @ts-ignore
    DisConnect
  } = usePhantomContext()
  const [isOpen, setOpen] = useState(false)


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
  // onClick={() => isConnected ? openAccountModal() : setOpen(true)}
  return (
    <>
      <div className={className}>
        {
          isConnected ? (
            <Menu >
              <Menu.Button className={s["primarybbtn"]}  >
                <div className={s.account}>
                  {/* <img className="pb-1 " src={ConnectWalletImg} alt="" /> */}
                  <img height={28} width={28} src={TBetIcon} />
                  <div>{isConnected ? balance : "Connect Wallet"}</div>
                  <div className="w-4 h-4">
                    <ChevronDownIcon className="size-4 fill-white" />
                  </div>
                </div>
              </Menu.Button >
              <Menu.Items
                className=" dropdownmnu w-52 origin-top-right rounded-xl p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] "
              >
                <Menu.Item>
                  <button onClick={openAccountModal} className="group flex w-full items-center gap-2  text-[20px]  mybutton rounded-lg max-sm:py-4 py-1.5 px-3 data-[focus]:bg-white/10">
                    <PencilIcon className="size-4 fill-white" />
                    Buy TBET
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘E</kbd>
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button onClick={copyadd} className="group  flex w-full items-center gap-2  text-[20px] max-sm:py-4  mybutton rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <Square2StackIcon className="size-4 fill-white" />
                    {`${getTruncatedHash(account, 4)}`}
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button onClick={DisConnect} className="group flex w-full items-center gap-2 text-[20px] max-sm:py-4 mybutton rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <XMarkIcon className="size-6 fill-white" />
                    Disconnect
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <PrimaryButton onClick={() => isConnected ? openAccountModal() : setOpen(true)} >
              <div className={s.account}>
                <img className=" ml-2" src={ConnectWalletImg} alt="" />
                <p className="max-sm:text-lg text-[24px] whitespace-nowrap  max-2xl:text-[18px]">{isConnected ? balance : "Connect Wallet"}</p>
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
        onTransactionConfirmation={() => setIsConfirmationOpen(true)}
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
