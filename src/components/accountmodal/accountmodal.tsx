import { Fragment, useEffect, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { ShieldCheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import TbetImage from "../../assets/tbet-icon.svg";
import {
  PRE_SALE_PROGRAM,
  tokenVaultAddress,
} from "../../presale/config/address";
import { PublicKey } from "@solana/web3.js";
import { useTbetBalance } from "../../hooks/use-tbet-balance";
import { connection } from "../../presale/config";
import { AccountModalContent } from "./account-modal-content";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const wallet = useAnchorWallet();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                {isOpen && wallet && (
                  <AccountModalContent wallet={wallet} onClose={onClose} />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
