import s from "./main.module.css"
import MainCoin from "../../assets/imgs/main-coin.png"

export const Main = () => {
    return (
        <section className={s["main-section"]}>
            <h1>TrustBet On-Chain: revolution<br /> in the iGaming industry</h1>
            <h3>Start earning and receive daily passive staking income<br /> from a licensed and regulated global casino and betting <br />platform no matter the market conditions.</h3>
            <img src={MainCoin} className={s["main-coin"]} alt="" />
        </section>
    )
}