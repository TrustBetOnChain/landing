import s from "./main.module.css";
import { Coin } from "../coin/coin";

export const Main = () => {
  return (
    <section className={s["topmainsection"]}>
      <div className={s["topmainmobile"]}>
        <h1
          className={
            "max-2xl:text-[50px] text-[72px] max-2xl:leading-[60px] leading-[86px]"
          }
        >
          TrustBet On-Chain: <br /> revolution in the <br />
          <span className="text-[--secondary-color]">iGaming industry</span>
        </h1>
        <p
          className={
            s["headertextinfo"] + " text-2xl font-light  max-w-[700px] mt-5"
          }
        >
          Start earning and receive daily passive staking income from a licensed
          and regulated global casino and betting platform no matter the market
          conditions.
        </p>
        <a className={s["button"] + " flex"} href={"#how-to-start"}>
          Start Now
        </a>
      </div>
      <Coin />
      <div className={s["backgroundmist"]} />
      {/* <a target="_blank" href="https://nft.assuredefi.com/?token=177">
        <img src={TBetGif} className={s["gif"]} alt="" />
      </a> */}
      {/* <ConnectModal isShowBalance={false} className={s["button"]} /> */}
    </section>
  );
};
