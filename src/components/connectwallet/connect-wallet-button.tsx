import { useConnectButton } from "../../hooks/useConnectButton";

import ConnectWalletImg from "../../assets/imgs/connect-wallet.svg";
export const ConnectWalletButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) => {
  const { onConnectButtonClick, connectWalletButtonText } = useConnectButton();
  return (
    <button
      className={className}
      onClick={() => {
        onClick?.();
        onConnectButtonClick();
      }}
    >
      {connectWalletButtonText()}
      <img src={ConnectWalletImg} alt="" />
    </button>
  );
};
