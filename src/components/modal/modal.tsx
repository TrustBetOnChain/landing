import React from "react";
import s from "./modal.module.css";
import Logo from "../../assets/imgs/modal-img.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <>
          <div onClick={onClose} className={s["modal-bg"]}></div>
          <div className={s["modal"]}>
            <h3 className={s["modal-header"]}>Documents</h3>
            <ul className={s["modal-list"]}>
              <li className={s["modal-item"]}>
                <a href="#">White Paper</a>
                <img src={Logo} alt="Logo" />
              </li>
              <li className={s["modal-item"]}>
                <a href="#">Token Sale Agreement</a>
                <img src={Logo} alt="Logo" />
              </li>
              <li className={s["modal-item"]}>
                <a href="#">Terms of Service</a>
                <img src={Logo} alt="Logo" />
              </li>
              <li className={s["modal-item"]}>
                <a href="#">Privacy Policy</a>
                <img src={Logo} alt="Logo" />
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};
