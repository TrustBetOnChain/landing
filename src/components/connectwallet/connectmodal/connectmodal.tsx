import React, { Fragment } from "react";
import s from "./connectmodal.module.css";
import { Dialog, Transition } from "@headlessui/react";
import { Wallets } from "../wallets/wallets";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog open={isOpen} as="div" onClose={onClose}>
        <Transition.Child enter={s["modal-bg"]} as={Fragment}>
          <Dialog.Panel>
            <div className={s["modal-bg"]}></div>
            <div className={s["modal"]}>
              <Dialog.Title>
                <div className={s["modal-header"]}>Wallets</div>
                <button className={s["modal-close"]} onClick={onClose}>
                  X
                </button>
              </Dialog.Title>
              <Wallets />
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
