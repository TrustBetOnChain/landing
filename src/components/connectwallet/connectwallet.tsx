import s from "./connectwallet.module.scss";
import Info from "../../assets/imgs/info.svg";

export const ConnectWallet = () => {
  return (
    <section className={`${s.info} ` + " w-full max-sm:mt-10  mt-40"}>
      <div className="max-2xl:max-w-[1000px] max-w-[85%]">
        <div className="grid place-content-center">
          <img src={Info} alt="" />
        </div>
        <h2 className="max-2xl:text-[29px] max-sm:text-[24px] max-sm:mx-4 text-[42px] mt-20">
          TrustBet On-Chain is a gamechanger in the online iGaming industry
          designed to transform the conventional iGaming experience
        </h2>
        <div className="w-full grid place-content-center">
          <p className="-mt-4 max-2xl:text-[20px] max-sm:mx-4 max-sm:text-lg text-2xl max-2xl:max-w-[900px] max-w-[1200px] font-light text-center">
            We are pioneering a future of fairness, transparency, and
            equilibrium in the digital iGaming realm. Be part of this exciting
            journey as we redefine the iGaming experience.
          </p>
        </div>
        {/* <ConnectModal isShowBalance={false} className={s["button"]} /> */}
      </div>
    </section>
  );
};
