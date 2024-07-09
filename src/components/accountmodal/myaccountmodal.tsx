import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

import usePhantomContext from "../../Context/usePhantomContext";
import { MyAccountModalContent } from "./myaccount-modal-content";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onTransactionConfirmation: (sig: string) => void;
}

export const MyAccountModal: React.FC<Props> = ({
    isOpen,
    onClose,
    onTransactionConfirmation,
}) => {
    const anchorWallet = useAnchorWallet();
    const { wallet } = useWallet();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { DisConnect } = usePhantomContext();

    function handleDisconnect() {
        DisConnect();
        onClose();
    }

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[1000]" onClose={onClose}>
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
                                {isOpen && (
                                    <MyAccountModalContent
                                        anchorWallet={anchorWallet!}
                                        wallet={wallet!}
                                        disconnect={handleDisconnect}
                                        onClose={onClose}
                                        onTransactionConfirmation={onTransactionConfirmation}
                                    />
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
