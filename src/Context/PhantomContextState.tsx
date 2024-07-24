/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useEffect, useState } from "react";
import PhantomContext from "./PhantomContext";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { ENDPOINT } from "../presale/config";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  CoinbaseWalletName,
  PhantomWalletName,
  SolflareWalletName,
  TrustWalletName,
} from "@solana/wallet-adapter-wallets";
import { getSolPrice } from "../util";

const wallet = {
  Phantom: PhantomWalletName,
  Solflare: SolflareWalletName,
  trustwallet: TrustWalletName,
  coinbase: CoinbaseWalletName,
};

const PhantomContextState: FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [SolanaBalance, setSolanaBalance] = useState<any>(0);
  const {
    select,
    // connected,
    disconnect,
    wallet: selectedwallet,
  } = useWallet();

  const [isConnected, setisConnected] = useState(false);
  const getProvider = () => {
    if ("phantom" in window) {
      // @ts-ignore
      const provider = window.phantom?.solana as any;
      if (provider?.isPhantom) {
        return provider;
      }
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("isConnected")) {
      // @ts-ignore
      Connect(sessionStorage.getItem("walletname")!);
      // connect();
    }
    // setProvider(getProvider());
  }, []);

  useEffect(() => {
    const maxReloads = 2;
    const reloadCount = parseInt(
      sessionStorage.getItem("reloadCount") || "0",
      10,
    );
    // @ts-ignore
    if (!window.phantom && reloadCount < maxReloads) {
      sessionStorage.setItem("reloadCount", (reloadCount + 1).toString());
      if (!navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        window.location.reload();
      }
    }
  }, []);

  // useEffect(() => {
  //   // Store user's public key once they connect
  //   if (provider) {
  //     provider?.on("connect", (publicKey: string) => {
  //       console.log(publicKey);
  //       setisConnected(true);
  //       setAccount(publicKey.toString());
  //       connect();
  //       // connect();
  //     });

  //     // Forget user's public key once they disconnect
  //     provider?.on("disconnect", () => {
  //       setisConnected(false);
  //       setAccount(null);
  //       setProvider(null);
  //     });

  //     provider?.on("accountChanged", (publicKey: any) => {
  //       console.log("account changed");
  //       if (publicKey) {
  //         // Set new public key and continue as usual
  //         // connect();
  //         setAccount(publicKey.toBase58());
  //       }
  //     });
  //   }

  // }, [provider]);
  const getBalance = async () => {
    const connection = new Connection(ENDPOINT, "confirmed");
    const wallet = new PublicKey(account!);
    return `${(await connection.getBalance(wallet)) / LAMPORTS_PER_SOL} SOL`;
  };
  const buildUrl = (path: string, params: URLSearchParams) =>
    `https://solflare.com/ul/${path}?${params.toString()}`;
  const Connect = async (
    walletType: "Phantom" | "Solflare" | "trustwallet" | "coinbase",
  ) => {
    if (walletType === "Phantom") {
      if (!("phantom" in window)) {
        return window.open(
          // "https://phantom.app/ul/browse?url=htps://trustbetonchain.com&ref=app.phantom",
          // "https://phantom.app/ul/browse/landing-git-feature-fixtransaction-trust-bet.vercel.app/?ref=https://https://landing-git-feature-fixtransaction-trust-bet.vercel.app//",
          "https://phantom.app/ul/browse/https://landing-git-feature-solflarecoinbase-trust-bet.vercel.app//?ref=https://landing-git-feature-solflarecoinbase-trust-bet.vercel.app//",
          "_blank",
        );
      }
    }
    if (walletType === "Solflare") {
      if (!("solflare" in window)) {
        const params = new URLSearchParams({
          ref: "https://landing-git-feature-solflarecoinbase-trust-bet.vercel.app/",
        });
        const url = buildUrl(
          `v1/browse/${encodeURIComponent("https://landing-git-feature-solflarecoinbase-trust-bet.vercel.app/")}`,
          params,
        );
        return window.open(url, "_blank");
      }
    }
    try {
      if (walletType === "Phantom") {
        const provider = getProvider(); // see "Detecting the Provider"
        const resp = await provider.request({ method: "connect" });
        setAccount(resp.publicKey.toString());
      }
      if (!selectedwallet) {
        connectPhantom(walletType);
      }
      setisConnected(true);
      sessionStorage.setItem("isConnected", "true");
      sessionStorage.setItem("walletname", walletType);
    } catch (err) {
      console.log(err);
      console.log({ code: 4001, message: "User rejected the request." });
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("walletname")) {
      // @ts-ignore
      select(wallet[sessionStorage.getItem("walletname")!]);
    }
  }, []);

  const getbalancesolana = async () => {
    setSolanaBalance(await getSolPrice());
  };
  useEffect(() => {
    if (isConnected) {
      getbalancesolana();
    }
  }, [isConnected]);

  const DisConnect = () => {
    const _provider = getProvider();
    _provider!.disconnect()!;
    disconnect();
    setAccount("");
    setisConnected(false);
    sessionStorage.clear();
  };

  const connectPhantom = (walletType: any) => {
    // Retrieve the wallet name from local storage
    // Map of wallet names to wallet adapter constants
    // Select the wallet and connect if not already connected
    // @ts-ignore
    select(wallet[walletType]);
  };

  return (
    <PhantomContext.Provider
      value={{
        getProvider,
        account,
        isConnected,
        SolanaBalance,
        setAccount,
        Connect,
        DisConnect,
        getBalance,
        balance,
        setBalance,
      }}
    >
      {children}
    </PhantomContext.Provider>
  );
};

export default PhantomContextState;
