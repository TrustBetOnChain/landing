import React, { useEffect, useState } from "react";
import s from "./footer.module.css";
import { ConnectModal } from "../connectwallet/connectmodal";

export const Footer = () => {
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + windowHeight;

      // Hide footer when we're close to the bottom of the page
      if (documentHeight - scrollBottom < 50) {
        setShowFooter(false);
      } else {
        setShowFooter(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className={`${s.footer} sm:hidden max-sm:${showFooter ? "visible" : "hidden"}`}>
      <ConnectModal className={s.button} />
    </footer>
  );
};
