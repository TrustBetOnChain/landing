import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import ConnectWalletImg from "../../assets/imgs/connect-wallet.svg";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { PrimaryButton } from "../primarybutton/primarybutton";
import { useState } from "react";
import { AccountModal } from "../accountmodal/accountmodal";
import { getTruncatedHash } from "../../util";

import s from "./connectwallet.module.scss";
import { useTbetStake } from "../../hooks/use-tbet-balance";
import { PublicKey } from "@solana/web3.js";
import { PRE_SALE_PROGRAM } from "../../presale/config/address";
import { CLUSTER } from "../../presale/config";

export const ConnectWalletButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  const { setVisible } = useWalletModal();
  const { connected, disconnect, publicKey } = useWallet();
  const wallet = useAnchorWallet();
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const userInfoAddress = publicKey
    ? PublicKey.findProgramAddressSync(
        [Buffer.from("user_info"), publicKey.toBuffer()],
        PRE_SALE_PROGRAM,
      )[0]
    : null;

  const balance = useTbetStake(userInfoAddress, "userInfo", wallet);

  const handleClick = () => {
    onClick?.();

    connected ? openAccountModal() : setVisible(true);
  };

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
