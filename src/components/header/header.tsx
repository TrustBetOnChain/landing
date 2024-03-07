import s from "./header.module.css";
import logo from "../../assets/imgs/logo.svg";
import { PageSection } from "../../page-section";

export const Header = () => {
  return (
    <header className={s["header"]}>
      <nav>
        <ul className={s["nav-list"]}>
          <li className={s["nav-item"]}>
            <a href="#">
              <img src={logo} alt="" />
            </a>
          </li>
          <li className={s["nav-item"]}>
            <a href={`#${PageSection.ABOUT}`}>About</a>
            <a href={`#${PageSection.HOW_TO_START}`}>How to start</a>
            <a href={`#${PageSection.TBET_TOKENS}`}>TBET tokens</a>
            <a href={`#${PageSection.ROADMAP}`}>Roadmap</a>
            <a href={`#${PageSection.CONTACT}`}> Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
