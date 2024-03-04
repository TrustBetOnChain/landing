import s from "./connectwallet.module.css";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Info from "../../assets/imgs/info.webp";
import ConnectWalletImg from "../../assets/imgs/connect-wallet.svg";
import { useWallet } from "@solana/wallet-adapter-react";

export const ConnectWallet = () => {
  const { connected, connecting, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const connectWalletButtonText = () => {
    if (connecting) return "Connecting";
    if (connected) return "Disconnect";
    return "Connect Wallet";
  };

  const onConnectButtonClick = () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  return (
    <section className={`${s.info} container`}>
      <img src={Info} alt="" />
      <h2>
        TrustBet On-Chain is a gamechanger in the online iGaming industry
        designed to transform the conventional iGaming experience.
      </h2>
      <p>
        We are pioneering a future of fairness, transparency, and
        <br /> equilibrium in the digital iGaming realm. Be part of this
        <br /> exciting journey as we redefine the iGaming experience
      </p>
      <button onClick={onConnectButtonClick} className="connect-wallet-btn">
        {connectWalletButtonText()}
        <img src={ConnectWalletImg} alt="" />
      </button>
    </section>
  );
};
