import s from "./connectwallet.module.css";
import Info from "../../assets/imgs/info.webp";
import { ConnectWalletButton } from "./connect-wallet-button";

export const ConnectWallet = () => {
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
      <ConnectWalletButton className="connect-wallet-btn" />
    </section>
  );
};
