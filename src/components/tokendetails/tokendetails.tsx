import s from "./tokendetails.module.css";

import CopyIcon from "../../assets/imgs/copy-icon.svg"
import TBetIcon from "../../assets/imgs/t-bet-icon.svg"
import TBetGif from "../../assets/imgs/t-bet-gif.gif"
export const TokenDetails = () => {
  return (
    <section className={s["token-details"] + " " + "container"}>
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
                <div className={s["card-head"]}>
                  <h3>Contract Address</h3>
                  <img src={CopyIcon} alt="" />
                </div>
                <p>xpFbKJa92Ee1NSYEhc3b3BV<br/>k4im8YStXRaVW6EoW33w</p>
              </li>
            </ul>
            <div className={s["token-details-footer"]}>
              <h3>Pre-Sale Details</h3>
              <p>
                Phase of the presale will remain active until it is fully
                allocated or in the event of a significant announcement.
                Following this, we will transition to the second phase to
                accurately reflect our developmental progress.
                <br /> <br />
                Current Stage Price - Please note, as our circulating supply is
                significantly smaller than most projects and capped at 100
                million, with an initial circulating supply of 55 million, 30
                million to treasury and liquidity and 15 million locked in
                staking for up to 2 years with a slow unlock schedule the
                presale stage 1 price is 0.50 cents USD.
              </p>
            </div>
          </div>
        </aside>
        <article className={s["article"]}>
            <div className={s["article-header"]}>
            <p ><span>Please note:</span> You will need to manually add the TBET details to all wallets EXCEPT Phantom Wallet. Phantom Wallet has been updated automatically being a native wallet to Solana DAO interaction. All other wallets will show TBET as an SPL picture</p>
            <p className={s["text"]}>Phantom Wallet will show the following:<img src={TBetIcon} /></p>
            </div>
            <div className={s["article-footer"]}>
                <img className={s["tbet-gif"]} src={TBetGif} alt="" />
                <aside>
                    <h3>TrustBet On-Chain | KYC<br/> by Assure DeFi</h3>
                    <p>This NFT is a sign of approval that the project TrustBet On-Chain has successfully passed a KYC by AssureDeFi.</p>
                    <h4>Version: 2.0<br/>
Team Members Verified: 1<br/>
Ticker: $TBET</h4>
                </aside>
            </div>
        </article>
      </div>
    </section>
  );
};
