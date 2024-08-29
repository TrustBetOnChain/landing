import React from "react";
import s from "./cards.module.css";

import Card1 from "../../assets/imgs/card-img-1.png";
import Card2 from "../../assets/imgs/card-img-2.png";
import { PageSection } from "../../page-section";

export const Cards = () => {
  return (
    <section
      id={PageSection.ABOUT}
      className={s["aboutsectionbg"] + " w-full  "}
    >
      <div className={s["aboutsection"] + " m-auto max-w-[85%]"}>
        <div className="flex-[.5]">
          <h2 className={s["section-title"]}>
            <span className="text-[--secondary-color]">Transform</span> the
            conventional <br /> iGaming experience
          </h2>
          <div className={s["section-subtitle"] + " w-[90%]"}>
            Discover the groundbreaking potential of TrustBet On-Chain (TBET),
            where token holders are catapulted into a realm of thrilling
            financial possibilities! With TBET, you're not just an investor;
            you're a pivotal decision maker, steering the DAO with your vote.
            Imagine a world where half of a bustling casino's profits flow
            directly into your wallet. That's right, 50% of casino profits are
            distributed as passive income exclusively to staked TBET holders
            within the DAO, revolutionizing the way you earn.
          </div>
        </div>
        <div className={s["cards-wrapper"] + " flex-[.5]"}>
          <div className={s["card"]}>
            <p>
              TrustBet On-Chain represents a <span className="text-[--primarytext-color]">democratized</span> iGaming universe that
              challenges the centralized nature of traditional platforms. The
              white paper thoroughly analyzes current pitfalls of the industry,
              highlighting the concentration of profits in the hands of a few.
            </p>
            <img className={s["card-img"]} src={Card2} alt="" />
          </div>
          <div className={s["card"]}>
            <p>
              Through its <span className="text-[--primarytext-color]">Decentralized Autonomous Organization (DAO)</span> structure
              on the Solana blockchain, TrustBet On-Chain breaks the existing
              practices by implementing transparency, fairness and community
              driven decision making.
            </p>
            <img className={s["card-img"]} src={Card1} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
