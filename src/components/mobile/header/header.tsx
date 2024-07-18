import s from "./headermobile.module.css";

import BurgerMenu from "../../../assets/imgs/burger-menu.svg";
import Logo from "../../../assets/imgs/logo.svg";
import Telegram from "../../../assets/imgs/tg.svg";
import Youtube from "../../../assets/imgs/youtube.svg";
import X from "../../../assets/imgs/x.svg";
import Cross from "../../../assets/imgs/cross.svg";
import Assure from "../../../assets/imgs/assure.svg";
import { PageSection } from "../../../page-section";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ConnectModal } from "../../connectwallet/connectmodal";

export const HeaderMobile = () => {
  const [modal, setModal] = useState(false);
  const [refAnimate] = useAutoAnimate();
  return (
    <header ref={refAnimate} className={s["header"]}>
      <nav className={s["nav"]}>
        <div className="gtranslate_wrapper"></div>
        <ul className={s["nav-list"]}>
          <li className={s["nav-list"]}>
            <img className={s["logo"]} src={Logo} alt="" />
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
                ></a>
              </li>
            </ul>
            <div className={s["aside-footer"]}>
              <ConnectModal className={s["button"]} isShowBalance={false} />
              <div className={s["aside-socials"]}>
                <a target="_blank" href="https://t.me/TrustBetOC">
                  <img src={Telegram} alt="" />
                </a>
                <a target="_blank" href="http://www.x.com/TrustBetOnChain">
                  <img src={X} alt="" />
                </a>
                <a
                  target="_blank"
                  href="https://assuredefi.com/projects/trustbet-on-chain"
                >
                  <img src={Assure} alt="" />
                </a>
                <a
                  target="_blank"
                  href="https://youtube.com/@TrustBetOn-Chain?si=OsoKzu-byPpM5w2D"
                >
                  <img src={Youtube} alt="" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};
