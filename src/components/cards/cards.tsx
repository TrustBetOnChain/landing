import React from 'react';
import s from "./cards.module.css";

import Card1 from "../../assets/imgs/card-img-1.png"
import Card2 from "../../assets/imgs/card-img-2.png"

export const Cards = () => {
    return (
        <section>
            <h2 className={s["section-title"]}>TrustBet On-Chain is a gamechanger in the online iGaming industry designed to transform the conventional iGaming experience.</h2>
            <h3 className={s["section-subtitle"]}>Discover the groundbreaking potential of TrustBet On-Chain (TBET), where token holders are catapulted into a realm of thrilling financial possibilities! With TBET, you're not just an investor; you're a pivotal decision-maker, steering the DAO with your vote. Imagine a world where half of a bustling casino's profits flow directly into your wallet. That's right, 50% of casino profits are distributed as passive income exclusively to staked TBET holders within the DAO, revolutionizing the way you earn.</h3>
            <div className={s["cards-wrapper"]}>
                <div className={s["card"]}>
                    <img className={s["card-img"]} src={Card1} alt="" />
                    <p>Through its Decentralized Autonomous Organization (DAO) structure on the Solana blockchain, TrustBet On-Chain breaks the existing practices by implementing transparency, fairness and community-driven decision making.</p>
                </div>
                <div className={s["card"]}>
                    <img className={s["card-img"]} src={Card2} alt="" />
                    <p>TrustBet On-Chain represents a democratized iGaming universe that challenges the centralized nature of traditional platforms. The white paper thoroughly analyzes current pitfalls of the industry, highlighting the concentration of profits in the hands of a few.</p>
                </div>
            </div>
        </section>
    );
};