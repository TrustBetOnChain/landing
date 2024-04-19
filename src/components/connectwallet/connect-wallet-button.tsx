import { useWallet } from "@solana/wallet-adapter-react";
import ConnectWalletImg from "../../assets/imgs/connect-wallet.svg";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { PrimaryButton } from "../primarybutton/primarybutton";
import { useState } from "react";
import { AccountModal } from "../accountmodal/accountmodal";
import { getTruncatedHash } from "../../util";

import s from "./connectwallet.module.scss";
import { useTbetBalance } from "../../hooks/use-tbet-balance";

export const ConnectWalletButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  const { setVisible } = useWalletModal();
  const { connected, disconnect, publicKey } = useWallet();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const balance = useTbetBalance(publicKey);

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
          {showBalance && <div>{Number(balance)}</div>}
        </div>
      </PrimaryButton>
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />
    </>
  );
};
