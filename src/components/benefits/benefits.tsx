
import  s  from "./benefits.module.css";
import BenefitCard1 from "../../assets/imgs/benefit-img-1.png"
import BenefitCard2 from "../../assets/imgs/benefit-img-2.png"
import BenefitCard3 from "../../assets/imgs/benefit-img-3.png"
import BenefitCard4 from "../../assets/imgs/benefit-img-4.png"
import Loading from "../../assets/imgs/loading.png"
import Solana from "../../assets/imgs/benefits-footer.png"

export const Benefits = () => {
    return (
        <section className={s.benefits + " " + "container"}>
            <h2>Pre-sale Benefits for Customers</h2>
            <ul className={`${s["benefits-cards"]} container`}>
                <li className={s["benefits-card"]}>
                    <h4 className={s["benefits-card-title"]}>Exclusive Access</h4>
                    <img className={s["benefits-card-img"]} src={BenefitCard1} alt="" />
                    <p>Take advantage of our exclusive pre-sale opportunity to gain early access to the TrustBet On-Chain platform. This is your chance to be among the first to experience the future of blockchain technology in gaming.</p>
                </li>
                <li className={s["benefits-card"]}>
                    <h4 className={s["benefits-card-title"]}>Exclusive Access</h4>
                    <img className={s["benefits-card-img"]} src={BenefitCard2} alt="" />
                    <p>Take advantage of our exclusive pre-sale opportunity to gain early access to the TrustBet On-Chain platform. This is your chance to be among the first to experience the future of blockchain technology in gaming.</p>
                </li>
                <li className={s["benefits-card"]}>
                    <h4 className={s["benefits-card-title"]}>Priority Participation</h4>
                    <img className={s["benefits-card-img"]} src={BenefitCard3} alt="" />
                    <p>Secure your place ahead of the crowd and be a part of the iGaming revolution.</p>
                </li>
                <li className={s["benefits-card"]}>
                    <h4 className={s["benefits-card-title"]}>Tier 1 listing announcement</h4>
                    <img className={s["benefits-card-img"]} src={Loading} alt="" />
                    <p className={s.soon}>soon</p>
                </li>
                <li className={s["benefits-card"]}>
                    <h4 className={s["benefits-card-title"]}>New Web 3.0 iGaming experiences</h4>
                    <img className={s["benefits-card-img"]} src={Loading} alt="" />
                    <p className={s.soon}>soon</p>
                </li>
                <li className={s["benefits-card"]}>
                    {/* <h4 className={s["benefits-card-title"]}>Exclusive Access</h4> */}
                    <div className={s["benefits-card-last"]}>
                        <img className={s["benefits-card-img"]} src={BenefitCard4} alt="" />
                    </div>
                    <p>Secure your position at the forefront of this iGaming revolution. Early investment not only guarantees your place ahead of the general public but also provides a significant advantage when the platform is listed on our first and subsequent Tier 1 exchanges.</p>
                </li>
            </ul>
            <div className={s["benefits-footer"]}>
                <img src={Solana} alt="" />
                <div className={s["benefits-footer-side"]}>
                    <h5>TrustBet On-Chain Commitment to Trust and Transparency</h5>
                    <p>TrustBet On-Chain delivers instant and transparent payouts through Smart Contracts on the Solana blockchain. Our DAO framework ensures decision-making driven by our community, coupled with profit-sharing. Payments to non-custodial wallets address the challenges commonly encountered in traditional platforms, positioning TrustBet as a paradigm of trust and reliability in the online iGaming industry.</p>
                </div>
            </div>
        </section>
    );
};