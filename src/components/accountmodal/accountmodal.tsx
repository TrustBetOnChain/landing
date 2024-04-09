import React, { Fragment, useState } from "react";
import Logo from "../../assets/imgs/modal-img.svg";
import { Dialog, Transition } from "@headlessui/react";

import s from "./accountmodal.module.scss";
import { useAutoAnimate } from "@formkit/auto-animate/react";
// import { TestPrices } from "../testprices/testprices";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const wallet = useAnchorWallet();

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog open={isOpen} as="div" onClose={onClose}>
        <Transition.Child enter={s["modal-bg"]} as={Fragment}>
          <Dialog.Panel>
            <div className={s["modal-bg"]}></div>
            <div className={s["modal"]}>
              <Dialog.Title>
                <div className={s["modal-header"]}></div>
                <button className={s["modal-close"]} onClick={onClose}>
                  X
                </button>
              </Dialog.Title>
              {/* {wallet && <TestPrices wallet={wallet} />} */}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
