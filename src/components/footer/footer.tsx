import ConnectWall from "../../assets/imgs/connect-wallet.svg"
import s from "./footer.module.css"
export const Footer = () => {
    return(
        <footer>
            <button className={s["button"]}>Connect Wallet
                <img src={ConnectWall} alt="" />
            </button>
        </footer>
    )
};
