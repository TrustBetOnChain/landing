/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useEffect, useState } from "react";
import PhantomContext from "./PhantomContext";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { ENDPOINT } from "../presale/config";

const PhantomContextState: FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [isConnected, setisConnected] = useState(false);
  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana as any;
      if (provider?.isPhantom) {
        return provider;
      }
    }
    window.open("https://phantom.app/", "_blank");
  };
  useEffect(() => {
    if (sessionStorage.getItem("isConnected")) {
      Connect();
    }
    setProvider(getProvider());
  }, []);
  useEffect(() => {
    // Store user's public key once they connect
    provider?.on("connect", (publicKey: string) => {
      setisConnected(true);
      setAccount(publicKey.toString());
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
    const provider = getProvider(); // see "Detecting the Provider"
    if (provider === null) {
      setProvider(provider);
    }
    try {
      const resp = await provider.request({ method: "connect" });
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
