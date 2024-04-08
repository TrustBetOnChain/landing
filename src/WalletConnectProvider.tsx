import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  TrustWalletAdapter,
  WalletConnectWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import { NETWORK, ORIGIN, WALLETCONNECT_PROJECT_ID } from "./constants";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

export const WalletConnectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(NETWORK), []);

  const wallets = useMemo(
    () => [
      new WalletConnectWalletAdapter({
        network: NETWORK,
        options: {
          relayUrl: "wss://relay.walletconnect.com",
          // example WC app project ID
          projectId: WALLETCONNECT_PROJECT_ID,
          metadata: {
            name: "TrustBet",
            description: "TrustBet",
            icons: ["https://avatars.githubusercontent.com/u/37784886"],
            url: ORIGIN,
          },
        },
      }),
      new PhantomWalletAdapter(),
      new TrustWalletAdapter(),
    ],
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
