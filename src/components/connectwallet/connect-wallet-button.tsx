import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { ConnectModal } from "./connectmodal/connectmodal";
import ConnectWalletImg from "../../assets/imgs/connect-wallet.svg";

export const ConnectWalletButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  const { select, wallets, publicKey, disconnect, connect, connected } =
    useWallet();
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  return (
    <>
      <button
        className={className}
        onClick={() => {
          onClick?.();
          setmodalIsOpen(true);
        }}
      >
        {connected ? "Disconnect" : "Connect Wallet"}
        <img src={ConnectWalletImg} alt="" />
      </button>
      <ConnectModal
        isOpen={modalIsOpen}
        onClose={() => setmodalIsOpen(false)}
      />
    </>
  );
};
