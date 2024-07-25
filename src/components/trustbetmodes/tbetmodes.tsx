import s from "./tbetmodes.module.css";
import TBet1 from "../../assets/imgs/t-bet-card-1.png";
import TBet2 from "../../assets/imgs/t-bet-card-2.png";
import TBet3 from "../../assets/imgs/t-bet-card-3.png";

export const TBetModes = () => {
  return (
    <section className={s["section"]}>
      <div className={s["t-bet-bg"]}></div>
      <div className={`max-w-[85%] m-auto ${s["trustbet-modes"]}`}>
        <h3 className="w-[70%] m-auto z-0">
          <strong>TrustBet On-Chain transcends being merely a platform,</strong>{" "}
          it represents a significant advancement into the future of iGaming.
          This innovative ecosystem is where responsiveness, transparency, and
          user empowerment converge to create a distinct and enhanced iGaming
          experience.
        </h3>
        <p>
          Utilizing industry leading and highly reputable gaming software,
          <br /> our platform offers an extensive array of gaming options.
        </p>
        <div className={s["trustbet-modes-cards"]}>
          <div className={s["trustbet-modes-card"]}>
            <h4>200+ slots</h4>
            <img src={TBet1} alt="" />
          </div>
          <div className={s["trustbet-modes-card"]}>
            <h4>Sports Betting</h4>
            <img src={TBet2} alt="" />
          </div>
          <div className={s["trustbet-modes-card"]}>
            <h4>Classic Games</h4>
            <img src={TBet3} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
