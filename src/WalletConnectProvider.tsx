import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import { NETWORK } from "./constants";

export const WalletConnectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(NETWORK), [NETWORK]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new TrustWalletAdapter(),
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/solana-labs/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [NETWORK],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
