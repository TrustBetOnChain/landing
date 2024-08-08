import React, { useMemo } from "react";
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
  ParticleAdapter,
  AlphaWalletAdapter,
  AvanaWalletAdapter,
  BitpieWalletAdapter,
  CoinhubWalletAdapter,
  FractalWalletAdapter,
  KeystoneWalletAdapter,
  KrystalWalletAdapter,
  HyperPayWalletAdapter,
  LedgerWalletAdapter,
  NufiWalletAdapter,
  OntoWalletAdapter,
  SafePalWalletAdapter,
  SaifuWalletAdapter,
  SkyWalletAdapter,
  SolongWalletAdapter,
  SpotWalletAdapter,
  TokenaryWalletAdapter,
  TrezorWalletAdapter,
  TokenPocketWalletAdapter,
  XDEFIWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Adapter, } from "@solana/wallet-adapter-base";
import { CLUSTER } from "./presale/config";
import { ORIGIN, } from "./constants";
import { UnifiedWalletProvider } from "@jup-ag/wallet-adapter";

// const ICON = `${ORIGIN}logo.svg`;

export const WalletConnectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const wallets: Adapter[] = useMemo(() => {
    return [
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
      // new WalletConnectWalletAdapter({
      //   network: "mainnet-beta" as WalletAdapterNetwork.Mainnet,
      //   options: {
      //     relayUrl: 'wss://relay.walletconnect.com',
      //     // example WC app project ID
      //     projectId: 'e899c82be21d4acca2c8aec45e893598',
      //     metadata: {
      //       name: 'Example App',
      //       description: 'Example App',
      //       url: 'https://github.com/anza-xyz/wallet-adapter',
      //       icons: ['https://avatars.githubusercontent.com/u/35608259?s=200'],
      //     },
      //   },
      // }),
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
      new ParticleAdapter(),
      new AlphaWalletAdapter(),
      new AvanaWalletAdapter(),
      new BitpieWalletAdapter(),
      new CoinhubWalletAdapter(),
      new FractalWalletAdapter(),
      new KeystoneWalletAdapter(),
      new KrystalWalletAdapter(),
      new HyperPayWalletAdapter(),
      new LedgerWalletAdapter(),
      new NufiWalletAdapter(),
      new OntoWalletAdapter(),
      new SafePalWalletAdapter(),
      new SaifuWalletAdapter(),
      new SkyWalletAdapter(),
      new SolongWalletAdapter(),
      new SpotWalletAdapter(),
      new TokenaryWalletAdapter(),
      new TrezorWalletAdapter(),
      new TokenPocketWalletAdapter(),
      new XDEFIWalletAdapter(),
    ];
  }, []);

  return (
    <UnifiedWalletProvider
      wallets={wallets}
      config={{
        theme: "dark",
        autoConnect: true,
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
