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
                presale Tier 1 price is set at a discounted $0.48 USD per token
                for a limited first 2 million TBET only. Our project
                distinguishes itself with a limited circulating supply capped at
                100 million tokens, significantly lower than typical offerings.
                Initially, 55 million tokens are in circulation, 30 million are
                allocated to our treasury and liquidity, and 15 million are
                locked in staking with a gradual release over two years. This
                structure underscores our commitment to stability and long-term
                value.
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
