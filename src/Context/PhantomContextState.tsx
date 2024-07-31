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
  // WalletConnectWalletName,
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

  const urlparam = new URLSearchParams(window.location.search);

  useEffect(() => {
    const maxReloads = 6;
    const reloadCount = parseInt(
      sessionStorage.getItem("reloadCount") || "0",
      10,
    );
    // @ts-ignore
    if (urlparam?.get("phantom") && reloadCount < maxReloads) {
      sessionStorage.setItem("reloadCount", (reloadCount + 1).toString());
      if (!navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        window.location.reload();
      }
    }
  }, []);

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
          `https://phantom.app/ul/browse/${window.location.href}?wallet=phantom/?ref=${window.location.href}?wallet=phantom`,
          "_blank",
        );
      }
    }
    if (walletType === "coinbase") {
      if (!("CoinbaseWalletProvider" in window)) {
        return window.open(
          `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(`${window.location.href}`)}`,
          "_blank",
        );
      }
    }
    if (walletType === "Solflare") {
      if (!("solflare" in window)) {
        const params = new URLSearchParams({
          ref: `${window.location.href}/`,
        });
        const url = buildUrl(
          `v1/browse/${encodeURIComponent(`${window.location.href}`)}`,
          params,
        );
        return window.open(url, "_blank");
      }
    }
    if (walletType === "trustwallet") {
      if (!("trustwallet" in window || "trustWallet" in window)) {
        return window.open(
          `https://link.trustwallet.com/open_url?url=${encodeURIComponent(`${window.location.href}`)}`,
          "_blank",
        );
      }
    }
    // if (walletType === "trustwallet") {
    //   // Function to check if Trust Wallet is available
    //   const isTrustWalletAvailable = () => {
    //     return (
    //       typeof window.ethereum !== "undefined" && window.ethereum.isTrust
    //     );
    //   };

    //   // Function to check if MetaMask is available
    //   const isMetaMaskAvailable = () => {
    //     return (
    //       typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask
    //     );
    //   };

    //   // Check for Trust Wallet specifically
    //   if (isTrustWalletAvailable()) {
    //     window.location.href = `trust://browser_open_url?url=${encodeURIComponent(`${window.location.href}`)}`;
    //   } else if (isMetaMaskAvailable()) {
    //     // Handle MetaMask case (example, opening in MetaMask browser if necessary)
    //     window.open(`${window.location.href}`, "_blank");
    //   } else {
    //     // If neither Trust Wallet nor MetaMask is available, open the fallback URL
    //     window.open(
    //       `https://link.trustwallet.com/open_url?url=${encodeURIComponent(`${window.location.href}`)}`,
    //       "_blank",
    //     );
    //   }
    // }

    try {
      if (walletType === "Phantom") {
        const provider = getProvider(); // see "Detecting the Provider"
        const resp = await provider.request({ method: "connect" });
        setAccount(resp.publicKey.toString());
      }
      if (!selectedwallet) {
        console.log({ walletType });
        connectPhantom(walletType);
      }
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
    if (urlparam.get("phantom")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("phantom");
      // Update the URL without reloading the page
      window.history.pushState({}, "", url);
    }
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
        setisConnected,
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
