/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import PhantomContext from "./PhantomContext";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { ENDPOINT } from "../presale/config";
import { useWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-wallets";
import { getSolPrice } from "../util";

const PhantomContextState: FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [SolanaBalance, setSolanaBalance] = useState<any>(0);
  const {
    select,
    connect,
    // connected,
    disconnect,
    wallet: selectedwallet,
  } = useWallet();
  console.log(useWallet());

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
      // connect();
    }
    // setProvider(getProvider());
  }, []);

  useEffect(() => {
    const maxReloads = 3;
    const reloadCount = parseInt(
      sessionStorage.getItem("reloadCount") || "0",
      10,
    );
    // @ts-ignore
    if (!window.phantom && reloadCount < maxReloads) {
      sessionStorage.setItem("reloadCount", (reloadCount + 1).toString());
      window.location.reload();
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
  // const Connect = async () => {
  //   // @ts-ignore
  //   if (!("phantom" in window)) {
  //     return window.open(
  //       // "https://phantom.app/ul/browse?url=htps://trustbetonchain.com&ref=app.phantom",
  //       // "https://phantom.app/ul/browse/landing-git-feature-fixtransaction-trust-bet.vercel.app/?ref=https://https://landing-git-feature-fixtransaction-trust-bet.vercel.app//",
  //       "https://phantom.app/ul/browse/landing-git-feature-phantomstaging-trust-bet.vercel.app?ref=https://landing-git-feature-phantomstaging-trust-bet.vercel.app/",
  //       "_blank",
  //     );
  //   }
  //   const provider = getProvider(); // see "Detecting the Provider"
  //   try {
  //     const resp = await provider.request({ method: "connect" });
  //     setisConnected(true);
  //     if (!selectedwallet) {
  //       connectPhantom();
  //     }
  //     sessionStorage.setItem("isConnected", "true");
  //     setAccount(resp.publicKey.toString());
  //   } catch (err) {
  //     console.log(err);
  //     console.log({ code: 4001, message: "User rejected the request." });
  //   }
  // };
  // Function to connect to Phantom wallet
  const Connect = async () => {
    const provider = getProvider();
    if (!provider) {
      const deepLinkUrl = encodeURIComponent(
        "https://landing-git-feature-phantomstaging-trust-bet.vercel.app/",
      ); // Customize your specific link
      if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        // Open the app store link for Phantom Wallet on iOS devices with a deeplink
        window.open(
          `https://apps.apple.com/app/id1598432977?deep_link=${deepLinkUrl}`,
          "_blank",
        );
      } else {
        // Open the Phantom app with a deeplink on other devices
        return window.open(
          "https://phantom.app/ul/browse/landing-git-feature-phantomstaging-trust-bet.vercel.app?ref=https://landing-git-feature-phantomstaging-trust-bet.vercel.app/",
          "_blank",
        );
      }
      console.log("Phantom wallet is not installed.");
      return;
    }

    try {
      const resp = await provider.request({ method: "connect" });
      setAccount(resp.publicKey.toString());
      setIsConnected(true);
      sessionStorage.setItem("isConnected", "true");

      if (!selectedWallet) {
        connectPhantom();
      }
    } catch (err) {
      console.log(err);
      console.log({ code: 4001, message: "User rejected the request." });
    }
  };
  const retryCountRef = useRef(0);
  useEffect(() => {
    if ("phantom" in window) {
      const wallet = {
        Phantom: PhantomWalletName,
      };
      // Select the wallet and connect if not already connected
      // if (!) {
      // @ts-ignore
      select(wallet["Phantom"]);
    }
  }, []);

  // useEffect(() => {
  //   if (account) {
  //     const tryConnect = () => {
  //       connect()
  //         .then(() => {
  //           console.log('Connected successfully');
  //           retryCountRef.current = 0; // Reset retry count on success
  //         })
  //         .catch(() => {
  //           if (retryCountRef.current < 3) {
  //             retryCountRef.current += 1;
  //             setTimeout(tryConnect, 500);
  //           } else {
  //             console.log('Failed to connect after 3 attempts');
  //             retryCountRef.current = 0; // Reset retry count after max attempts
  //           }
  //         });
  //     };

  //     tryConnect();
  //   }
  // }, [account, connect]);
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
  const connectPhantom = () => {
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
    // if (!) {
    // @ts-ignore
    select(wallet[walletName]);
    // connect()
    // }
  };

  // }, [select, connect,]);
  return (
    <PhantomContext.Provider
      value={{
        getProvider,
        account,
        isConnected,
        SolanaBalance,
        Connect,
        DisConnect,
        getBalance,
      }}
    >
      {children}
    </PhantomContext.Provider>
  );
};

export default PhantomContextState;
