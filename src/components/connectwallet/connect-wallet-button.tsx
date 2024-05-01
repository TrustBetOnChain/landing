import ConnectWalletImg from "../../assets/imgs/connect-wallet.svg";
import { PrimaryButton } from "../primarybutton/primarybutton";
import { useCallback, useState } from "react";
import { AccountModal } from "../accountmodal/accountmodal";
import { getTruncatedHash } from "../../util";

import s from "./connectwallet.module.scss";
import { useTbetStake } from "../../hooks/use-tbet-balance";
import { PublicKey } from "@solana/web3.js";
import { PRE_SALE_PROGRAM } from "../../presale/config/address";
import { CLUSTER } from "../../presale/config";
import {
  useUnifiedWalletContext,
  useUnifiedWallet,
} from "@jup-ag/wallet-adapter";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

import {
  SolanaMobileWalletAdapterWalletName,
  //@ts-ignore
} from "@solana-mobile/wallet-adapter-mobile";

export const MWA_NOT_FOUND_ERROR = "MWA_NOT_FOUND_ERROR";

export const ConnectWalletButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const { setShowModal, theme } = useUnifiedWalletContext();
  const { wallet } = useUnifiedWallet();
  const { disconnect, connect, connecting, connected, publicKey } =
    useUnifiedWallet();
  const anchorWallet = useAnchorWallet();

  const tryToConnect = useCallback(async () => {
    try {
      setShowModal(true);
    } catch (error) {
      if (error instanceof Error && error.message === MWA_NOT_FOUND_ERROR) {
        setShowModal(true);
      }
    }
  }, [anchorWallet, connect]);

  const handleClick = useCallback(async () => {
    onClick?.();

    connected ? openAccountModal() : setShowModal(true);
  }, [anchorWallet, connect]);

  const userInfoAddress = publicKey
    ? PublicKey.findProgramAddressSync(
        [Buffer.from("user_info"), publicKey.toBuffer()],
        PRE_SALE_PROGRAM,
      )[0]
    : null;

  const balance = useTbetStake(userInfoAddress, "userInfo", anchorWallet);

  const openAccountModal = () => {
    setIsAccountOpen(true);
  };

  const showBalance = connected && publicKey;

  const label = showBalance
    ? getTruncatedHash(publicKey.toString())
    : "Connect Wallet";

  return (
    <>
      <PrimaryButton className={className} onClick={handleClick}>
        <div className={s.account}>
          <div>{label}</div>
          <img className="pb-1 ml-2" src={ConnectWalletImg} alt="" />
          {showBalance && <div>{Number(Number(balance) / 10 ** 6)}</div>}
        </div>
      </PrimaryButton>
      {CLUSTER === "devnet" && (
        <AccountModal
          isOpen={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
        />
      )}
    </>
  );
};
