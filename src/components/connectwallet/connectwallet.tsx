import s from "./connectwallet.module.scss";
import Info from "../../assets/imgs/info.webp";
import { ConnectWalletButton } from "./connect-wallet-button";

export const ConnectWallet = () => {
  return (
    <section className={`${s.info} container`}>
      <img src={Info} alt="" />
      <h2>
        TrustBet On-Chain is a gamechanger in the online iGaming industry
        designed to transform the conventional iGaming experience
      </h2>
      <p style={{ textAlign: "center", maxWidth: "500px" }}>
        We are pioneering a future of fairness, transparency, and equilibrium in
        the digital iGaming realm. Be part of this exciting journey as we
        redefine the iGaming experience.
      </p>
      <ConnectWalletButton />
    </section>
  );
};
