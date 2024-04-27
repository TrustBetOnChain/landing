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
import { Adapter, WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { CLUSTER, ENDPOINT } from "./presale/config";
import { ORIGIN, WALLETCONNECT_PROJECT_ID } from "./constants";
import { UnifiedWalletProvider } from "@jup-ag/wallet-adapter";

import {
  SolanaMobileWalletAdapter,
  createDefaultAddressSelector,
  createDefaultAuthorizationResultCache,
  createDefaultWalletNotFoundHandler,
  //@ts-ignore
} from "@solana-mobile/wallet-adapter-mobile";

const ICON = `${ENDPOINT}logo.svg`;

export const WalletConnectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const wallets: Adapter[] = useMemo(() => {
    return [
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
      new WalletConnectWalletAdapter({
        network: CLUSTER as
          | WalletAdapterNetwork.Devnet
          | WalletAdapterNetwork.Mainnet,
        options: {
          projectId: WALLETCONNECT_PROJECT_ID,
          metadata: {
            name: "Trust Bet On-Chain",
            description: "Trust Bet On-Chain",
            icons: [ICON],
            url: ENDPOINT,
          },
        },
      }),
      new SolanaMobileWalletAdapter({
        addressSelector: createDefaultAddressSelector(),
        appIdentity: {
          name: "rust Bet On-Chain",
          uri: ENDPOINT,
          icon: ICON,
        },
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        cluster: CLUSTER,
        onWalletNotFound: createDefaultWalletNotFoundHandler(),
      }),
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
    ];
  }, []);

  return (
    <UnifiedWalletProvider
      wallets={wallets}
      config={{
        theme: "dark",
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
