import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
export const useConnectButton = () => {
  const { connected, connecting, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const connectWalletButtonText = () => {
    if (connecting) return "Connecting";
    if (connected) return "Disconnect";
    return "Connect Wallet";
  };

  const onConnectButtonClick = () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  return {
    connectWalletButtonText,
    onConnectButtonClick,
  };
};
