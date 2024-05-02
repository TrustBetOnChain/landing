import { useEffect, useState } from "react";
import { ConnectWalletButton } from "../connectwallet/connect-wallet-button";
import s from "./footer.module.css";
export const Footer = () => {
  const [showButton, setShowButton] = useState(true);
  const handleScroll = () => {
    const position = window.scrollY;
    if (position > 200) {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <footer>
      <ConnectWalletButton
        showBalance={true}
        className={
          s["button"] + " " + (showButton ? s["non-visible"] : s["visible"])
        }
      />
    </footer>
  );
};
