import { useConnectButton } from "../../hooks/useConnectButton";

import ConnectWalletImg from "../../assets/imgs/connect-wallet.svg";
export const ConnectWalletButton = ({ className }: { className?: string }) => {
  const { onConnectButtonClick, connectWalletButtonText } = useConnectButton();
  return (
    <button className={className} onClick={onConnectButtonClick}>
      {connectWalletButtonText()}
      <img src={ConnectWalletImg} alt="" />
    </button>
  );
};
