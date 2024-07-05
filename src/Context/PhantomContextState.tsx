/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import PhantomContext from "./PhantomContext";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { ENDPOINT } from "../presale/config";
import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-wallets";

const PhantomContextState: FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const { select, connect, connected } = useWallet();
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
      Connect();
      connect();
    }
    setProvider(getProvider());
  }, []);
  useEffect(() => {
    // Store user's public key once they connect
    provider?.on("connect", (publicKey: string) => {
      setisConnected(true);
      setAccount(publicKey.toString());
      connect();
    });

    // Forget user's public key once they disconnect
    provider?.on("disconnect", () => {
      setisConnected(false);
      setAccount(null);
      setProvider(null);
    });

    provider?.on("accountChanged", (publicKey: any) => {
      if (publicKey) {
        // Set new public key and continue as usual
        setAccount(publicKey.toBase58());
      }
    });
  }, [provider]);
  const getBalance = async () => {
    const connection = new Connection(ENDPOINT, "confirmed");
    const wallet = new PublicKey(account!);
    return `${(await connection.getBalance(wallet)) / LAMPORTS_PER_SOL} SOL`;
  };
  const Connect = async () => {
    if (!("phantom" in window)) {
      window.open(
        // "https://phantom.app/ul/browse?url=htps://trustbetonchain.com&ref=app.phantom",
        "https://phantom.app/ul/browse/landing-git-feature-phantomstaging-trust-bet.vercel.app?ref=https://landing-git-feature-phantomstaging-trust-bet.vercel.app/",
        "_blank",
      );
    }
    const provider = getProvider(); // see "Detecting the Provider"
    if (provider === null) {
      setProvider(provider);
    }
    try {
      const resp = await provider.request({ method: "connect" });
      connectPhantom();
      console.log(resp.publicKey.toString());
      sessionStorage.setItem("isConnected", "true");
    } catch (err) {
      console.log(err);
      console.log({ code: 4001, message: "User rejected the request." });
    }
  };
  const DisConnect = () => {
    const _provider = getProvider();
    _provider!.disconnect()!;
    sessionStorage.clear();
  };
  const connectPhantom = useCallback(async () => {
    // Retrieve the wallet name from local storage
    let walletName = window.localStorage.getItem("walletName");
    // Default to Phantom if no wallet name is found or if it's undefined
    walletName =
      !walletName || walletName === "undefined" ? "Phantom" : walletName;
    // Map of wallet names to wallet adapter constants
    const wallet = {
      Phantom: PhantomWalletName,
    };
    // Select the wallet and connect if not already connected
    if (!connected) {
      // @ts-ignore
      select(wallet[walletName]);
    }
  }, [select, connect, connected]);
  return (
    <PhantomContext.Provider
      value={{
        getProvider,
        account,
        isConnected,
        Connect,
        provider,
        DisConnect,
        getBalance,
      }}
    >
      {children}
    </PhantomContext.Provider>
  );
};

export default PhantomContextState;
