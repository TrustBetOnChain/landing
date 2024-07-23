// import { useEffect, useState } from "react";
import s from "./footer.module.css";
import { ConnectModal } from "../connectwallet/connectmodal";
export const Footer = () => {
  // const [showButton, setShowButton] = useState(true);
  // const handleScroll = () => {
  //   const position = window.scrollY;
  //   if (position > 200) {
  //     setShowButton(false);
  //   } else {
  //     setShowButton(true);
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  return (
    <footer>
      <ConnectModal
        className={
          s["button"] + " " + s["visible"]
        }
      />
    </footer>
  );
};
