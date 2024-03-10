import s from "./contactus.module.css";

import TBetLogo from "../../assets/imgs/logo.svg";
import Discord from "../../assets/imgs/discord.svg";
import Telegram from "../../assets/imgs/tg.svg";
import Youtube from "../../assets/imgs/youtube.svg";
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
            <a href="#">Terms of Service</a>

            <a href="#">Privacy Policy</a>
            <span>Development by:</span>
            <a href="#">FINPR Agency</a>
          </div>
          <div className={s["aside-socials"]}>
            <a href="https://discord.com/invite/dxRQXn6F2S">
              <img src={Discord} alt="" />
            </a>
            <a href="https://t.me/TrustBetOC">
              <img src={Telegram} alt="" />
            </a>
            <a href="http://www.x.com/TrustBetOnChain">
              <img src={X} alt="" />
            </a>
            <a href="https://assuredefi.com/projects/trustbet-on-chain">
              <img src={Assure} alt="" />
            </a>
            <a href="https://youtube.com/@TrustBetOn-Chain?si=OsoKzu-byPpM5w2D">
              <img src={Youtube} alt="" />
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
