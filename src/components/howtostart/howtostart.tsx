import React from 'react';
import s from "./howtostart.module.css";
import Phone from "../../assets/imgs/phone.webp"
import Device from "../../assets/imgs/how-to-start-2.webp"
import Bets from "../../assets/imgs/how-to-start-3.webp"

export const HowToStart = () => {
    return (
        <section className={`${s["how-to-start"]} container`}>
            <div className={s["how-to-start-title"]}>
                <h2>How to Start</h2>
                <div className={s["how-to-start-cards"]}>
                <div className={s["how-to-start-card"]}>
                    <h3>1. Connecting your wallet</h3>
                    <p>As a platform operating on the Solana Blockchain, our preferred digital wallets are Phantom Wallet and Trust Wallet, with a particular emphasis on Phantom Wallet. This preference stems from Phantom Wallet's design, which is tailored for seamless integration with Solana's Decentralized Autonomous Organization (DAO) infrastructure, accessible at <a href="https://app.realms.today/dao/TBET">https://app.realms.today/dao/TBET</a></p>
                </div>
                <div className={s["how-to-start-card"]}>
                    <h3>2. Confirm Transaction</h3>
                    <p>Accepted payments are</p>
                    <ul>
                        <li>BTC</li>
                        <li>ETH</li>
                        <li>SOL</li>
                        <li>USDT (ETH Chain)</li>
                        <li>USDC (ETH and SOL Chains)</li>
                    </ul>
                </div>
                <div className={s["how-to-start-card"]}>
                    <h3>3. Claim Tokens</h3>
                    <p>Congratulations! You can claim your TBET after the presale ends with an unlock schedule of 10% per month from TGE to protect your investment.</p>
                </div>
            </div>
            </div>

          

            <article>
                <img className={s["how-to-start-device"]} src={Bets} alt="" />
                <img className={s["how-to-start-phone"]} src={Phone} alt="" />
                <img className={s["how-to-start-bets"]} src={Device} alt="" />
            </article>
        </section>
    );
};