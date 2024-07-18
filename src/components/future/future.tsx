import React from "react";
import s from "./future.module.css";
import FutureIcon1 from "../../assets/imgs/future-icon-1.svg";
import FutureIcon2 from "../../assets/imgs/future-icon-2.svg";
import FutureIcon3 from "../../assets/imgs/future-icon-3.svg";
import COINTRUSTBET from "../../assets/imgs/coin-img.png";
export const Future = () => {
  return (
    <section className={s.future + " " + "w-full"}>
      <div className={s["future-title"] + " max-w-[85%] m-auto relative"}>
        <img src={COINTRUSTBET} className={s["future-title-image"]} />
        <h2>
          <strong className="text-[--secondary-color]">
            Unlocking the Future: {" "}
          </strong>
          Immediate, Transparent <br /> Payouts  with
          TrustBet On-Chain
        </h2>
        <div className={s["future-text"]}>
          <div className={s["future-card"]}>
            <div className={s["future-card-title"]}>
              <img src={FutureIcon1} alt="" />
              <div className={s["future-card-line"]}></div>
            </div>
            <p>
              Contrary to conventional platforms, TrustBet leverages Smart
              Contracts to facilitate immediate and direct settlements, thereby
              bypassing the typical delays inherent in traditional payment
              systems.{" "}
            </p>
          </div>
          <div className={s["future-card"]}>
            <div className={s["future-card-title"]}>
              <img src={FutureIcon2} alt="" />
              <div className={s["future-card-line"]}></div>
            </div>
            <p>
              Payments in USDT are executed directly to non-custodial wallets
              linked through the main user interface. This utilization of Web
              3.0 technology distinctly positions us ahead of our competitors.{" "}
            </p>
          </div>
          <div className={s["future-card"]}>
            <div className={s["future-card-title"]}>
              <img src={FutureIcon3} alt="" />
              <div className={s["future-card-line"]}></div>
            </div>
            <p>
              Such an approach not only heightens user satisfaction but also
              sets a new benchmark for fairness in the industry{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
