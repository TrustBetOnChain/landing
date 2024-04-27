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

export const ConnectWalletButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const { setShowModal, theme } = useUnifiedWalletContext();
  const { disconnect, connect, connecting, connected, publicKey } =
    useUnifiedWallet();
  const wallet = useAnchorWallet();

  const handleClick = useCallback(async () => {
    onClick?.();

    if (CLUSTER === "devnet") {
      connected ? openAccountModal() : setShowModal(true);
    } else {
      connected ? disconnect() : setShowModal(true);
    }
  }, [wallet, connect]);

  const userInfoAddress = publicKey
    ? PublicKey.findProgramAddressSync(
        [Buffer.from("user_info"), publicKey.toBuffer()],
        PRE_SALE_PROGRAM,
      )[0]
    : null;

  const balance = useTbetStake(userInfoAddress, "userInfo", wallet);

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
