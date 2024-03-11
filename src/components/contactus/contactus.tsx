import s from "./contactus.module.css";
import React from "react";

import TBetLogo from "../../assets/imgs/logo.svg";
import Discord from "../../assets/imgs/discord.svg";
import Telegram from "../../assets/imgs/tg.svg";
import Youtube from "../../assets/imgs/youtube.svg";
import X from "../../assets/imgs/x.svg";
import Assure from "../../assets/imgs/assure.svg";
import { PageSection } from "../../page-section";
import { useState } from "react";
import { sendEmail } from "../../email/sendEmail";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sended, setSended] = useState(false);
  const [error, setError] = useState<Error>();
  const [isSending, isSetSending] = useState(false);

  const [refAnimate] = useAutoAnimate();

  const isValidForm =
    name.length > 3 && email.match(/^\S+@\S+\.\S+$/) && message.length > 3;

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isValidForm) return;
    isSetSending(true);
    sendEmail({ fromEmail: email, fromName: name, text: message })
      .then(() => {
        setSended(true);
        isSetSending(false);
      })
      .catch(setError);
  };

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
            <a href="#">Go to Information Page</a>
            <a
              target="_blank"
              href="https://drive.google.com/file/d/11bgcCf_e5tFLujVJBE2ySoRFblyVrxLe/view?usp=drive_link"
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
            <span>Development by:</span>
            <a target="_blank" href="https://finpr.agency/">
              FINPR Agency
            </a>
          </div>
          <div className={s["aside-socials"]}>
            <a target="_blank" href="https://discord.com/invite/dxRQXn6F2S">
              <img src={Discord} alt="" />
            </a>
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
      <article className={s["article"]}>
        <h2 className={s["title"]}>
          {sended ? "Thank you!" : "Have any questions?"}
        </h2>
        {!sended && (
          <form ref={refAnimate} className={s["form"]} action="">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={s["input"]}
              type="text"
              placeholder="Your Name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={s["input"]}
              type="email"
              placeholder="Email"
            />
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={s["input"]}
              type="text"
              placeholder="Message"
            />
            <button
              onClick={onClick}
              disabled={!name || !email.match(/^\S+@\S+\.\S+$/) || !message}
              className={s["button"]}
            >
              {isSending ? "Sending..." : "Send"}
              {error && (
                <p>{error instanceof Error ? error.message : "Error"}</p>
              )}
            </button>
          </form>
        )}
      </article>
    </section>
  );
};
