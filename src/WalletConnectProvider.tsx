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
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { Adapter } from "@solana/wallet-adapter-base";
import { CLUSTER } from "./presale/config";

export const WalletConnectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(CLUSTER), []);

  const wallets: Adapter[] = useMemo(() => {
    return [
      // new WalletConnectWalletAdapter({
      //   network: NETWORK,
      //   options: {
      //     relayUrl: "wss://relay.walletconnect.com",
      //     // example WC app project ID
      //     projectId: WALLETCONNECT_PROJECT_ID,
      //     metadata: {
      //       name: "TrustBet",
      //       description: "TrustBet",
      //       icons: ["https://avatars.githubusercontent.com/u/37784886"],
      //       url: ORIGIN,
      //     },
      //   },
      // }),
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
    ];
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
