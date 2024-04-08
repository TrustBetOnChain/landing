import { useWallet } from "@solana/wallet-adapter-react";
import ConnectWalletImg from "../../assets/imgs/connect-wallet.svg";
import {
  useWalletModal,
  BaseWalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PrimaryButton } from "../primarybutton/primarybutton";
import { useState } from "react";
import { AccountModal } from "../accountmodal/accountmodal";
import { getTruncatedHash } from "../../util";

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

  const handleClick = () => {
    onClick?.();

    connected ? openAccountModal() : setVisible(true);
  };

  const openAccountModal = () => {
    setIsAccountOpen(true);
  };

  return (
    <>
      <PrimaryButton
        className={className}
        label={
          connected && publicKey
            ? getTruncatedHash(publicKey?.toString())
            : "Connect Wallet"
        }
        icon={<img src={ConnectWalletImg} alt="" />}
        onClick={handleClick}
      />
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />
    </>
  );
};
