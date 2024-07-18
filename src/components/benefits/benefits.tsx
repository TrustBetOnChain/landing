import s from "./benefits.module.css";
import BenefitCard1 from "../../assets/imgs/benefit-img-1.png";
import BenefitCard2 from "../../assets/imgs/benefit-img-2.png";
import BenefitCard3 from "../../assets/imgs/benefit-img-3.png";
import BenefitCard4 from "../../assets/imgs/benefit-img-4.png";
import BACKCOIN from "../../assets/imgs/background-coins.png";
import Solana from "../../assets/imgs/benefits-footer.png";
import { DotLottiePlayer, PlayMode } from "@dotlottie/react-player";

export const Benefits = () => {
  return (
    <section className={s.benefits + " " + "w-full"}>
      <h2 className="text-[42px] text-center">
        Pre-sale <span className="text-[--secondary-color]">Benefits </span>
        for Customers
      </h2>
      <div className="max-w-[85%] m-auto">
        <img src={BACKCOIN} className={s["backcoin"]} />
        <ul className={`${s["benefits-cards"]} `}>
          <li className={s["benefits-card"]}>
            <h4 className={s["benefits-card-title"]}>Exclusive Access</h4>
            <img className={s["benefits-card-img"]} src={BenefitCard1} alt="" />
            <p>
              Take advantage of our exclusive pre-sale opportunity to gain early
              access to the TrustBet On-Chain platform. This is your chance to
              be among the first to experience the future of blockchain
              technology in iGaming.
            </p>
          </li>
          <li className={s["benefits-card"]}>
            <h4 className={s["benefits-card-title"]}>Special Bonuses</h4>
            <img className={s["benefits-card-img"]} src={BenefitCard2} alt="" />
            <p>
              Participate in our presale to access a range of unique bonuses and
              promotions, designed to enrich your experience from the outset.
            </p>
          </li>
          <li className={s["benefits-card"]}>
            <h4 className={s["benefits-card-title"]}>Priority Participation</h4>
            <img className={s["benefits-card-img"]} src={BenefitCard3} alt="" />
            <p>
              Secure your place ahead of the crowd and be a part of the iGaming
              revolution.
            </p>
          </li>
          <li className={s["benefits-card"]}>
            <h4 className={s["benefits-card-title"]}>
              Tier 1 listing announcement
            </h4>
            <DotLottiePlayer
              style={{ width: "180px", height: "180px" }}
              src="https://lottie.host/734b0e3e-a18a-4223-82f6-a6f68bd64d98/U6zYS1aq6J.json"
              background="transparent"
              direction={1}
              speed={1}
              playMode={PlayMode.Normal}
              loop
              autoplay
            />
            <p className={s.soon}>soon</p>
          </li>
          <li className={s["benefits-card"]}>
            <h4 className={s["benefits-card-title"]}>
              New Web 3.0 iGaming experiences
            </h4>
            <DotLottiePlayer
              style={{ width: "180px", height: "180px" }}
              src="https://lottie.host/734b0e3e-a18a-4223-82f6-a6f68bd64d98/U6zYS1aq6J.json"
              background="transparent"
              direction={1}
              speed={1}
              playMode={PlayMode.Normal}
              loop
              autoplay
            />
            <p className={s.soon}>soon</p>
          </li>
          <li className={s["benefits-card"]}>
            <div className={s["benefits-card-last"]}>
              <img
                className={s["benefits-card-img"]}
                src={BenefitCard4}
                alt=""
              />
            </div>
            <p>
              Secure your position at the forefront of this iGaming revolution.
              Early investment not only guarantees your place ahead of the
              general public but also provides a significant advantage when the
              platform is listed on our first and subsequent Tier 1 exchanges.
            </p>
          </li>
        </ul>
        <div className={s["benefits-footer"] + " m"}>
          <img src={Solana} alt="" />
          <div className={s["benefits-footer-side"]}>
            <h5>TrustBet On-Chain Commitment to Trust and Transparency</h5>
            <p>
              TrustBet On-Chain delivers instant and transparent payouts through
              Smart Contracts on the Solana blockchain. Our DAO framework
              ensures decision making driven by our community, coupled with
              profit sharing. Payments to non-custodial wallets address the
              challenges commonly encountered in traditional platforms,
              positioning TrustBet as a paradigm of trust and reliability in the
              online iGaming industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
