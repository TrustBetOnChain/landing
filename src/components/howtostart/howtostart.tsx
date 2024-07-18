import s from "./howtostart.module.css";
import Final from "../../assets/imgs/how-to-start.png";
import { PageSection } from "../../page-section";

export const HowToStart = () => {
  return (
    <section
      id={PageSection.HOW_TO_START}
      className={`${s["how-to-start"]} max-w-[85%] m-auto`}
    >
      <h2 className="text-[42px]">How to <span className="text-[--primarytext-color]">Start</span></h2>
      <div className={s["cards-wrapper"]}>
        <div className={s["how-to-start-title"]}>
          <div className={s["how-to-start-cards"]}>
            <div className={s["how-to-start-card"]}>
              <h3>1. Connecting your wallet</h3>
              <p>
                As a platform operating on the Solana Blockchain, our preferred
                digital wallets are Phantom Wallet and Trust Wallet, with a
                particular emphasis on Phantom Wallet. This preference stems
                from Phantom Wallet's design, which is tailored for seamless
                integration with Solana's Decentralized Autonomous Organization
                (DAO) infrastructure, accessible at{" "}
                <a target="_blank" href="https://app.realms.today/dao/TBET">
                  https://app.realms.today/dao/TBET
                </a>
              </p>
            </div>
            <div className={s["how-to-start-card"]}>
              <h3>2. Confirm Transaction</h3>
              <p>Accepted payments are</p>
              <ul>
                <li>SOL</li>
                <li>USDT</li>
                <li>USDC</li>
              </ul>
            </div>
            <div className={s["how-to-start-card"]}>
              <h3>3. Claim Tokens</h3>
              <p>
                Once the presale concludes, you'll be eligible to claim your
                TBET tokens, with a safeguarding strategic unlock schedule
                commencing one month after the Token Generation Event (TGE),
                followed by a consistent 10% monthly release. This carefully
                crafted strategy is tailored to maximize and protect the value
                of your investment.
              </p>
            </div>
          </div>
        </div>
        <article className={s["article"] + " grid place-content-center mb-20"}>
          <img className="w-[483px] h-[516px] " src={Final} alt="" />
        </article>
      </div>
    </section>
  );
};
