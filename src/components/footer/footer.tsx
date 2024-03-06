import { ConnectWalletButton } from "../connectwallet/connect-wallet-button";
import s from "./footer.module.css";
export const Footer = () => {
  return (
    <footer>
      <ConnectWalletButton className={s["button"]} />
    </footer>
  );
};
