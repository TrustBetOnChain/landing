import s from "./contactus.module.css";
import React from "react";

import TBetLogo from "../../assets/imgs/logo.svg";
import Telegram from "../../assets/imgs/tg.svg";
import Youtube from "../../assets/imgs/youtube.svg";
import X from "../../assets/imgs/x.svg";
import Assure from "../../assets/imgs/assure.svg";
import { PageSection } from "../../page-section";
import { useState } from "react";
import { sendEmail } from "../../email/sendEmail";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Modal } from "../modal/modal";

export const ContactUs = () => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [refAnimate] = useAutoAnimate();

  return (
    <section id={PageSection.CONTACT} className={`${s.contactus} container`}>
      <aside className={s["aside"]}>
        <div className={s["aside-header"]}>
          <img src={TBetLogo} alt="" />
          <p>
            TrustBet On-Chain represents a democratized iGaming universe that
            challenges the centralized nature of traditional platforms. The
            white paper thoroughly analyzes current pitfalls of the industry,
            highlighting the concentration of profits in the hands of a few.
          </p>
          <div>
            <a
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                setmodalIsOpen(true);
              }}
            >
              Go to Information Page
            </a>
            <a
              target="_blank"
              href="https://drive.google.com/file/d/1lfuu-qc4zeHDIIbHhZeAvclROMDtUfnR/view?usp=sharing"
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
        <span>
          Please join our Telegram and Twitter and we would be happy to answer
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
        </div>
      </article>
      <Modal isOpen={modalIsOpen} onClose={() => setmodalIsOpen(false)} />
    </section>
  );
};
