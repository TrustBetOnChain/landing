import s from "./main.module.css";

import TBetGif from "../../assets/imgs/t-bet-gif.gif";
import { ConnectWalletButton } from "../connectwallet/connect-wallet-button";
import { Coin } from "../coin/coin";

export const Main = () => {
  return (
    <section className={s["main-section"]}>
      <h1>
        TrustBet On-Chain: revolution
        <br /> in the iGaming industry
      </h1>
      <div className={s["h3"]}>
        Start earning and receive daily passive staking income from a licensed
        and regulated global casino and betting platform no matter the market
        conditions.
        <div className={s["info"]}>
          <span>i</span>
          <div>
            It will be available when the DAO goes live. Passive income is
            derived from USDT Casino earnings and is not dependant on the
            performance of the TBET token in a bear market or due to volatility.
          </div>
        </div>
      </div>
      <Coin />
      <a
        target="_blank"
        href="https://content.assuredefi.com/verification-package-content/trustbet-on-chain"
      >
        <img src={TBetGif} className={s["gif"]} alt="" />
      </a>
      <ConnectWalletButton className={s["button"]} />
    </section>
  );
};
