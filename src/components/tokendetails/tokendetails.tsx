import s from "./tokendetails.module.css";

import CopyIcon from "../../assets/imgs/copy-icon.svg";
import TBetIcon from "../../assets/imgs/t-bet-icon.svg";
import TBetGif from "../../assets/imgs/t-bet-gif.gif";
import { PageSection } from "../../page-section";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export const TokenDetails = () => {
  const [copy, setCopy] = useState(false);
  const [refAnimate] = useAutoAnimate();
  return (
    <section
      id={PageSection.TBET_TOKENS}
      className={s["token-details"] + " " + "container"}
    >
      <h2 className={s["token-title"]}>Token Details</h2>
      <div className={s["token-details-wrapper"]}>
        <aside>
          <div className={s["token-details-header"]}>
            <ul className={s["token-details-header-cards"]}>
              <li className={s["token-details-header-card"]}>
                <div className={s["card-head"]}>
                  <h3>Token Name</h3>
                </div>
                <p>TrustBet On-Chain</p>
              </li>
              <li className={s["token-details-header-card"]}>
                <div className={s["card-head"]}>
                  <h3>Token Symbol</h3>
                </div>
                <p>TBET</p>
              </li>
              <li className={s["token-details-header-card"]}>
                <div className={s["card-head"]}>
                  <h3>Token Type</h3>
                </div>
                <p>
                  Solana SPL
                  <br /> 6 Decimals
                </p>
              </li>
              <li className={s["token-details-header-card"]}>
                <div ref={refAnimate} className={s["card-head"]}>
                  <h3>Contract Address</h3>
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigator.clipboard.writeText("xpFbKJa92Ee1NSYEhc3b3BV");
                      setCopy(true);
                      setTimeout(() => {
                        setCopy(false);
                      }, 1000);
                    }}
                    src={CopyIcon}
                    alt=""
                  />
                  {copy && <p>Copied!</p>}
                </div>
                <p>
                  xpFbKJa92Ee1NSYEhc3b3BV
                  <br />
                  k4im8YStXRaVW6EoW33w
                </p>
              </li>
            </ul>
            <div className={s["token-details-footer"]}>
              <h3>Pre-Sale Details</h3>
              <p>
                The presale phase will remain active until it is either fully
                allocated or if there is a significant announcement. Following
                this, we will transition to the next phase, which will more
                accurately reflect our developmental progress.
                <br /> <br />
                <span className={s["green"]}>Current Stage Price</span> - The
                first stage of presale will commence at a price of 0.10 USDT
                (Ten cents) for the first 5 million TBET tokens sold and will
                increase in 2 cent increments thereafter. For example, Stage 2
                presale will be set at 0.12 USDT (Twelve cents) for the second 5
                million TBET allotment and will continue at the same incremental
                rate with a maximum target of 55 million TBET tokens to be sold
                or until its manual completion. TrustBet distinguishes itself
                with a limited maximum supply capped at 100 million tokens,
                significantly lower than typical offerings. This makes the
                Presale price point very lucrative for early adopters who
                recognize before others the immense potential of the TrustBet
                ecosystem and its extremely generous rewards system for staked
                holders of TBET tokens, whereby, they will be paid 50% of a
                bustling Casino's profits as a form of passive income directly
                into their wallet in USDT. Such a high rate of Casino profits
                paid out in USDT is unprecedented and underscores our commitment
                to rewarding our community and providing long term value to our
                holders.
              </p>
            </div>
          </div>
        </aside>
        <article className={s["article"]}>
          <div className={s["article-header"]}>
            <p>
              <span>Please note:</span> You will need to manually add the TBET
              details to all wallets EXCEPT Phantom Wallet. Phantom Wallet has
              been updated automatically being a native wallet to Solana DAO
              interaction. All other wallets will show TBET as an SPL picture.
            </p>
            <p className={s["text"]}>
              Phantom Wallet will show the following:
              <img src={TBetIcon} />
            </p>
          </div>
          <div className={s["article-footer"]}>
            <img className={s["tbet-gif"]} src={TBetGif} alt="" />
            <aside>
              <h3>
                TrustBet On-Chain | KYC
                <br /> by Assure DeFi
              </h3>
              <p>
                This NFT is a sign of approval that the project TrustBet
                On-Chain has successfully passed a KYC by AssureDeFi.
              </p>
              <h4>
                Version: 2.0
                <br />
                Team Members Verified: 1<br />
                Ticker: $TBET
              </h4>
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
};
