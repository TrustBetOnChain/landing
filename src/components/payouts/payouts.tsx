import React from "react";
import s from "./payouts.module.css";
import PayoutsCard1 from "../../assets/imgs/payouts-card-1.svg";
import PayoutsCard2 from "../../assets/imgs/payouts-card-2.svg";

export const Payouts = () => {
  return (
    <section className={` w-full`}>
      <div className={`max-sm:max-w-full max-w-[85%] ${s.payouts} m-auto`}>
        <article>
          <h3>
            Immediate Transparent Payouts and<strong> Web 3.0 Model</strong>
          </h3>
          <div className={"bg-[#FFFFFF33] my-5 " + s["divider"]} />
          <p>
            Our organization, being a Decentralized Autonomous Organization
            (DAO), enables auditing through direct examination of the DAO and
            the open ledger on the blockchain.
            <br />
            <br />
            This transparent framework ensures operational integrity, as funds
            cannot be transferred without a consensus vote. The only exception
            is the smart contract for passive income, which is programmed to
            activate monthly based on pre-established code, maintaining the
            transparency and trust inherent in our system.
          </p>
        </article>
        <div className={s["payouts-cards"] + " gap-11"}>
          <div className={s["payouts-card"]}>
            <h4>Smart Contracts</h4>
            <p>
              TrustBet On-Chain offers immediate
              <br /> financial settlements via advanced
              <br /> smart contracts, exceeding the <br />
              operational capabilities of existing
              <br /> market players
            </p>
            <img className={s["payouts-card-img"]} src={PayoutsCard1} alt="" />
          </div>
          <div className={s["payouts-card"]}>
            <h4>Web 3.0 Model</h4>
            <p>
              Leveraging the power of Web 3.0 and advanced artificial
              intelligence, TrustBet On-Chain revolutionizes transaction
              processes, avoiding the need for traditional trust mechanisms.
              This model guarantees fairness and facilitates immediate payouts,
              showcasing the transformative benefits and capabilities of these
              cutting-edge technologies.
            </p>
            <img className={s["payouts-card-img"]} src={PayoutsCard2} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
