import { FC, Fragment } from "react";
import "./index.css";
import { Dialog, Transition } from "@headlessui/react";
import PHANTOMWALLET from "../../assets/imgs/phantom.svg";
import COINBASEWALLET from "../../assets/imgs/coinbase.svg";
import SOLFLAREWALLET from "../../assets/imgs/solflare.svg";
import TRUSTWALLET from "../../assets/imgs/trustwallet.svg";
import usePhantomContext from "../../Context/usePhantomContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}
const ConnectWalletmodalPopup: FC<Props> = ({ isOpen, onClose }) => {
    const { Connect } = usePhantomContext();
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

                <div className="fixed inset-0 z-10 overflow-y-auto mobilemodal">
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
                            <Dialog.Panel className="flex w-full  transform transition justify-center items-center">
                                {isOpen && (
                                    <div className="bg-[#131D18] relative  overflow-hidden max-sm:!w-[369px]  rounded-[20px] w-[50%] px-11 max-sm:!px-[36px] connectwalletwrapper  max-2xl:py-[80px] py-[130px] shadow-2xl ">
                                        <div className="bgmist" />
                                        <button
                                            type="button"
                                            className="absolute hover:bg-[#299c35] right-4 top-4 text-white hover:text-white sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                            onClick={onClose}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                        <h1 className="max-2xl:mb-6 max-2xl:text-[50px] text-[60px] max-sm:text-[32px] mb-[60px] max-sm:mb-[44px] max-2xl:text-[40px]">
                                            Connect{" "}
                                            <span className="text-[--primarytext-color]">Wallet</span>
                                        </h1>
                                        <div className="walletswrapper  max-sm:gap-[14px] ">
                                            <div
                                                onClick={() => {
                                                    Connect();
                                                    onClose();
                                                }}
                                                className="flex justify-center items-center gap-4 wallet max-2xl:w-[273px] max-sm:!w-full "
                                            >
                                                <img src={PHANTOMWALLET} />
                                                <p>Phantom Wallet </p>
                                            </div>
                                            <div className="flex justify-center items-center gap-4 wallet max-2xl:w-[273px] max-sm:!w-full ">
                                                <img src={COINBASEWALLET} />
                                                <p>Coinbase Wallet </p>
                                            </div>
                                            <div className="flex justify-center items-center gap-4 wallet max-2xl:w-[273px] max-sm:!w-full ">
                                                <img src={TRUSTWALLET} />
                                                <p>Trust Wallet </p>
                                            </div>
                                            <div className="flex justify-center items-center gap-4 wallet max-2xl:w-[273px] max-sm:!w-full ">
                                                <img src={SOLFLAREWALLET} />
                                                <p>Solflare Wallet </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ConnectWalletmodalPopup;
