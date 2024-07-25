import s from "./contactus.module.css";
import React from "react";

import TBetLogo from "../../assets/imgs/logo.svg";
import Telegram from "../../assets/imgs/tg.svg";
import Youtube from "../../assets/imgs/youtube.svg";
import X from "../../assets/imgs/x.svg";
import Assure from "../../assets/imgs/assure.svg";
import MEDIUM from "../../assets/imgs/Medium_Icon.svg";
import DISCORD from "../../assets/imgs/discord.svg";
import { PageSection } from "../../page-section";
import { useState } from "react";
import { Modal } from "../modal/modal";

export const ContactUs = () => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  return (
    <section
      id={PageSection.CONTACT}
      className={`${s.contactus} max-w-[84%] max-sm:!max-w-full mx-auto`}
    >
      <aside className={s["aside"]}>
        <div className={s["aside-header"]}>
          <img src={TBetLogo} alt="" />
          <p>
            TrustBet On-Chain represents a democratized iGaming universe that
            challenges the centralized nature of traditional platforms. The
            white paper thoroughly analyzes current pitfalls of the industry,
            highlighting the concentration of profits in the hands of a few.
          </p>
          <div className={s["header-contactus-link"]}>
            <a
              target="_blank"
              href="https://drive.google.com/file/d/16UHbchyN24CgOac8_7F_ln0BZUvTNdIx/view?usp=sharing"
            >
              Go to Information Page
            </a>
            <a
              target="_blank"
              href="https://drive.google.com/drive/folders/0AK7xtU8S9J_GUk9PVA"
            >
              Whitepaper
            </a>
          </div>
        </div>
        <div className={s["aside-footer"]}>
          <div className={s["aside-links"]}>
            <a
              target="_blank"
              href="https://drive.google.com/file/d/1O338yHyAhKo9YNVNoVQhFZur6L0ScDg-/view?usp=drive_link"
            >
              Terms of Service
            </a>
            <a
              target="_blank"
              href="https://drive.google.com/file/d/1ZWo6ucHm0Cu9ZaHVuu6NHRdxx-HI2fkx/view?usp=drive_link"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </aside>
      <article className={s["article"]}>
        <h2 className={s["title"]}>Have any questions?</h2>
        <span className={s["span"] + " !mb-5"}>
          Please join our Discord, Telegram and X.com and we <br /> would be
          happy to answer
        </span>
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
          <a target="_blank" href="https://discord.gg/x54S3bChs3">
            <img src={DISCORD} alt="" />
          </a>
          <a target="_blank" href="https://medium.com/@TrustBet">
            <img src={MEDIUM} alt="" />
          </a>
        </div>
      </article>
      <Modal isOpen={modalIsOpen} onClose={() => setmodalIsOpen(false)} />
    </section>
  );
};
