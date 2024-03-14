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
                <h3 className={s["modal-header"]}>Documents</h3>
                <button className={s["modal-close"]} onClick={onClose}>
                  X
                </button>
              </Dialog.Title>
              <ul className={s["modal-list"]}>
                <li className={s["modal-item"]}>
                  <a
                    target="_blank"
                    href="https://drive.google.com/file/d/11bgcCf_e5tFLujVJBE2ySoRFblyVrxLe/view?usp=drive_link"
                  >
                    White Paper
                  </a>
                  <img src={Logo} alt="Logo" />
                </li>
                <li className={s["modal-item"]}>
                  <a href="#">Token Sale Agreement</a>
                  <img src={Logo} alt="Logo" />
                </li>
                <li className={s["modal-item"]}>
                  <a
                    target="_blank"
                    href="https://drive.google.com/file/d/1O338yHyAhKo9YNVNoVQhFZur6L0ScDg-/view?usp=drive_link"
                  >
                    Terms of Service
                  </a>
                  <img src={Logo} alt="Logo" />
                </li>
                <li className={s["modal-item"]}>
                  <a
                    target="_blank"
                    href="https://drive.google.com/file/d/1ZWo6ucHm0Cu9ZaHVuu6NHRdxx-HI2fkx/view?usp=drive_link"
                  >
                    Privacy Policy
                  </a>
                  <img src={Logo} alt="Logo" />
                </li>
              </ul>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
