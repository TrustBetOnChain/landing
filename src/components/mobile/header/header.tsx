import s from "./headermobile.module.css";

import BurgerMenu from "../../../assets/imgs/burger-menu.svg";
import Logo from "../../../assets/imgs/logo.svg";
import Discord from "../../../assets/imgs/discord.svg";
import Telegram from "../../../assets/imgs/tg.svg";
import X from "../../../assets/imgs/x.svg";
import Cross from "../../../assets/imgs/cross.svg";
import Assure from "../../../assets/imgs/assure.svg";
import { ConnectWalletButton } from "../../connectwallet/connect-wallet-button";
import { PageSection } from "../../../page-section";
import { useState } from "react";

export const HeaderMobile = () => {
  const [modal, setModal] = useState(false);
  return (
    <header className={s["header"]}>
      <nav className={s["nav"]}>
        <ul className={s["nav-list"]}>
          <li className={s["nav-list"]}>
            <img src={Logo} alt="" />
          </li>
          <li className={s["burger-menu"]}>
            <img onClick={() => setModal(true)} src={BurgerMenu} alt="" />
          </li>
        </ul>
      </nav>
      {modal && (
        <div className={s["pop-up"]}>
          <div></div>
          <aside className={s["aside"]}>
            <div className={s["aside-header"]}>
              <img src={Logo} alt="" />
              <img onClick={() => setModal(false)} src={Cross} alt="" />
            </div>
            <ul className={s["aside-list"]}>
              <li>
                <a
                  onClick={() => setModal(false)}
                  // src={Cross}
                  href={`#${PageSection.ABOUT}`}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  onClick={() => setModal(false)}
                  // src={Cross}
                  href={`#${PageSection.HOW_TO_START}`}
                >
                  How to start
                </a>
              </li>
              <li>
                <a
                  onClick={() => setModal(false)}
                  // src={Cross}
                  href={`#${PageSection.TBET_TOKENS}`}
                >
                  TBET tokens
                </a>
              </li>
              <li>
                <a
                  onClick={() => setModal(false)}
                  // src={Cross}
                  href={`#${PageSection.ROADMAP}`}
                >
                  Roadmap
                </a>
              </li>
              <li>
                <a
                  onClick={() => setModal(false)}
                  // src={Cross}
                  href={`#${PageSection.CONTACT}`}
                >
                  {" "}
                  Contact
                </a>
              </li>
            </ul>
            <div className={s["aside-footer"]}>
              <ConnectWalletButton className={s["button"]} />
              <div className={s["aside-socials"]}>
                <a href="#">
                  <img src={Discord} alt="" />
                </a>
                <a href="#">
                  <img src={Telegram} alt="" />
                </a>
                <a href="#">
                  <img src={X} alt="" />
                </a>
                <a href="#">
                  <img src={Assure} alt="" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};
