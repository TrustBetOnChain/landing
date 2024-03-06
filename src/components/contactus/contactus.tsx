import s from "./contactus.module.css";

import TBetLogo from "../../assets/imgs/logo.svg";
import Discord from "../../assets/imgs/discord.svg";
import Telegram from "../../assets/imgs/tg.svg";
import X from "../../assets/imgs/x.svg";
import Assure from "../../assets/imgs/assure.svg";
import { PageSection } from "../../page-section";

export const ContactUs = () => {
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
            <a href="#">Whitepaper</a>
          </div>
        </div>
        <div className={s["aside-footer"]}>
          <div className={s["aside-links"]}>
            <p>
              <a href="#">Terms of Service</a>
              <span>Development by:</span>
            </p>
            <p>
              <a href="#">Privacy Policy</a>
              <a href="#">FINPR Agency</a>
            </p>
          </div>
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
      <article className={s["article"]}>
        <h2 className={s["title"]}>Have any questions?</h2>
        <form className={s["form"]} action="">
          <input className={s["input"]} type="text" placeholder="Your Name" />
          <input className={s["input"]} type="email" placeholder="Email" />
          <input className={s["input"]} type="text" placeholder="Message" />
          <button className={s["button"]}>send</button>
        </form>
      </article>
    </section>
  );
};
