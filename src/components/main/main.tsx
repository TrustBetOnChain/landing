import s from "./main.module.css";

import TBetGif from "../../assets/imgs/t-bet-gif.gif";
import { Coin } from "../coin/coin";
import { ConnectModal } from "../connectwallet/connectmodal";

export const Main = () => {
  return (
    <section className={s["main-section"]}>
      <h1 className={s["h1"]}>
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
      <a target="_blank" href="https://nft.assuredefi.com/?token=177">
        <img src={TBetGif} className={s["gif"]} alt="" />
      </a>
      <ConnectModal isShowBalance={false} className={s["button"]} />
    </section>
  );
};
