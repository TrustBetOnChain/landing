import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  BitgetWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  HuobiWalletAdapter,
  MathWalletAdapter,
  NekoWalletAdapter,
  NightlyWalletAdapter,
  PhantomWalletAdapter,
  SalmonWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  TrustWalletAdapter,
  WalletConnectWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { Adapter, WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { CLUSTER, ENDPOINT } from "./presale/config";
import { ORIGIN, WALLETCONNECT_PROJECT_ID } from "./constants";
import { UnifiedWalletProvider } from "@jup-ag/wallet-adapter";

export const WalletConnectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const wallets: Adapter[] = useMemo(() => {
    return [
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
      new TorusWalletAdapter(),
      new TrustWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new HuobiWalletAdapter(),
      new MathWalletAdapter(),
      new Coin98WalletAdapter(),
      new CloverWalletAdapter(),
      new BitgetWalletAdapter(),
      new NekoWalletAdapter(),
      new NightlyWalletAdapter(),
      new SalmonWalletAdapter(),
      // new WalletConnectWalletAdapter({
      //   network: CLUSTER as
      //     | WalletAdapterNetwork.Devnet
      //     | WalletAdapterNetwork.Mainnet,
      //   options: {
      //     relayUrl: "wss://relay.walletconnect.com",
      //     // example WC app project ID
      //     projectId: WALLETCONNECT_PROJECT_ID,
      //     metadata: {
      //       name: "TrustBet",
      //       description: "TrustBet",
      //       icons: ["https://avatars.githubusercontent.com/u/37784886"],
      //       url: ENDPOINT,
      //     },
      //   },
      // }),
    ];
  }, []);

  return (
    <UnifiedWalletProvider
      wallets={wallets}
      config={{
        autoConnect: false,
        env: CLUSTER,
        metadata: {
          name: "Trustbetonchain",
          description: "Trustbetonchain",
          url: ORIGIN,
          iconUrls: [],
        },
        walletlistExplanation: {
          href: "https://station.jup.ag/docs/additional-topics/wallet-list",
        },
      }}
    >
      {children}
    </UnifiedWalletProvider>
  );
};
