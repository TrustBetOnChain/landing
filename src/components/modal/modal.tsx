import React, { Fragment } from "react";
import s from "./modal.module.css";
import Logo from "../../assets/imgs/modal-img.svg";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog open={isOpen} as="div" onClose={onClose}>
        <Transition.Child enter={s["modal-bg"]} as={Fragment}>
          <Dialog.Panel>
            <div className={s["modal-bg"]}></div>
            <div className={s["modal"]}>
              <Dialog.Title>
                <h4 className={s["modal-header"]}>Documents</h4>
                <button className={s["modal-close"]} onClick={onClose}>
                  X
                </button>
              </Dialog.Title>
              <ul className={s["modal-list"]}>
                <a
                  target="_blank"
                  href="https://drive.google.com/file/d/1lfuu-qc4zeHDIIbHhZeAvclROMDtUfnR/view?usp=sharing"
                  className={s["modal-item"]}
                >
                  White Paper
                  <img src={Logo} alt="Logo" />
                </a>
                <a href="#" className={s["modal-item"]}>
                  Token Sale Agreement
                  <img src={Logo} alt="Logo" />
                </a>
                <a
                  target="_blank"
                  href="https://drive.google.com/file/d/1O338yHyAhKo9YNVNoVQhFZur6L0ScDg-/view?usp=drive_link"
                  className={s["modal-item"]}
                >
                  Terms of Service
                  <img src={Logo} alt="Logo" />
                </a>
                <a
                  target="_blank"
                  href="https://drive.google.com/file/d/1ZWo6ucHm0Cu9ZaHVuu6NHRdxx-HI2fkx/view?usp=drive_link"
                  className={s["modal-item"]}
                >
                  Privacy Policy
                  <img src={Logo} alt="Logo" />
                </a>
              </ul>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
