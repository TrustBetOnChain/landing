import s from "./header.module.css";
import  logo from "../../assets/imgs/logo.svg"

export const Header = () => {
  return (
    <header>
      <nav>
        <ul className={s["nav-list"]}>
          <li className={s["nav-item"]}>
            <a href="#">
              <img src={logo} alt="" />
            </a>
          </li>
          <li className={s["nav-item"]}>
            <a href="#">About</a>
            <a href="#">How to Start</a>
            <a href="#">TBET Tokens</a>
            <a href="#">Roadmap</a>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
