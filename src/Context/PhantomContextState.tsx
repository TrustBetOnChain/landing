/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useEffect, useState } from "react";
import PhantomContext from "./PhantomContext";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { connection, ENDPOINT } from "../presale/config";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  CoinbaseWalletName,
  PhantomWalletName,
  SolflareWalletName,
  TrustWalletName,
  // WalletConnectWalletName,
} from "@solana/wallet-adapter-wallets";
import { getSolPrice } from "../util";
import { getAssociatedTokenAddress } from "@solana/spl-token";

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

  const USDT_MINT = new PublicKey(
    "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  );

  const USDC_MINT = new PublicKey(
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  );

  // const urlparam = new URLSearchParams(window.location.search);
  const getUSDCBalance = async () => {
    // Get the associated token account address for this user's USDC
    const tokenAccount = await getAssociatedTokenAddress(
      USDC_MINT,
      new PublicKey(account!),
    );

    // Fetch the token account info
    const tokenAccountInfo = await connection.getAccountInfo(tokenAccount);

    if (tokenAccountInfo) {
      // If the account exists, get its balance
      const accountData = Buffer.from(tokenAccountInfo.data);
      const balance = accountData.readBigUInt64LE(64);

      // USDC has 6 decimal places
      const usdcBalance = Number(balance) / 1_000_000;

      return usdcBalance;
    } else {
      // If the account doesn't exist, the balance is 0
      return 0;
    }
  };
  const getUSDTBalance = async () => {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      new PublicKey(account!),
      { mint: USDT_MINT },
    );

    if (tokenAccounts.value.length > 0) {
      const balance =
        tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
      return balance;
    } else {
      return 0;
    }
  };

  // useEffect(() => {
  //   if (urlParams.get("wallet")) {
  //     // @ts-ignore
  //     Connect(urlparam.get("wallet"));
  //   }
  //   // const maxReloads = 6;
  //   // const reloadCount = parseInt(
  //   //   sessionStorage.getItem("reloadCount") || "0",
  //   //   10,
  //   // );
  //   // // @ts-ignore
  //   // if (urlparam?.get("phantom") && reloadCount < maxReloads) {
  //   //   sessionStorage.setItem("reloadCount", (reloadCount + 1).toString());
  //   //   if (!navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
  //   //     window.location.reload();
  //   //   }
  //   // }
  // }, []);

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
          `https://phantom.app/ul/browse/${window.location.href}/?ref=${window.location.href}`,
          "_blank",
        );
      }
    }
    if (walletType === "coinbase") {
      if (!("CoinbaseWalletProvider" in window)) {
        return window.open(
          `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(`${window.location.href}`)}?wallet=${walletType}`,
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
          `v1/browse/${encodeURIComponent(`${window.location.href}?wallet=${walletType}`)}`,
          params,
        );
        return window.open(url, "_blank");
      }
    }
    if (walletType === "trustwallet") {
      if (!("trustwallet" in window || "trustWallet" in window)) {
        // return window.open(
        //   `https://link.trustwallet.com/open_url?url=${window.location.href}?wallet=${walletType}`,
        //   "_blank",
        // );
        const url = `${window.location.href}?wallet=${walletType}`;
        const deepLink = `trustwallet://open_url?coin_id=60&url=${encodeURIComponent(url)}`;

        window.location.href = deepLink; // Open the Trust Wallet app directly
        // Fallback to Trust Wallet's app page if it's not installed
        setTimeout(() => {
          window.location.href =
            "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp";
        }, 2000);
      }
    }
    try {
      if (walletType === "Phantom") {
        console.log("phantom");

        const provider = getProvider(); // see "Detecting the Provider"
        const resp = await provider.request({ method: "connect" });
        setAccount(resp.publicKey.toString());
      }
      if (!selectedwallet) {
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
    console.log("balance")
    setSolanaBalance(await getSolPrice());
  };
  useEffect(() => {
    if (isConnected) {
      getbalancesolana();
    }
  }, [isConnected]);

  const DisConnect = () => {
    const _provider = getProvider();
    if (_provider) {
      _provider!.disconnect()!;
    }
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
        getbalancesolana,
        DisConnect,
        setisConnected,
        getUSDTBalance,
        getBalance,
        getUSDCBalance,
        balance,
        setBalance,
      }}
    >
      {children}
    </PhantomContext.Provider>
  );
};

export default PhantomContextState;
