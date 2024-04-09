import { useWallet } from "@solana/wallet-adapter-react";

import styles from "./wallets.module.scss";

export const Wallets = () => {
  const { select, wallets, publicKey, disconnect, connect } = useWallet();

  console.log(wallets);

  return !publicKey ? (
    <div className={styles.wallets}>
      {wallets.filter((wallet) => wallet.readyState === "Installed").length >
      0 ? (
        wallets
          .filter((wallet) => wallet.readyState === "Installed")
          .map((wallet) => (
            <button
              key={wallet.adapter.name}
              onClick={() => {
                select(wallet.adapter.name);
              }}
            >
              {wallet.adapter.name}
              <img
                className={styles.walletIcon}
                src={wallet.adapter.icon}
                alt={wallet.adapter.name}
              />
            </button>
          ))
      ) : (
        <div>No wallet found. Please download a supported Solana wallet</div>
      )}
    </div>
  ) : (
    <div>
      <div>{publicKey.toBase58()}</div>
      <button onClick={disconnect}>disconnect wallet</button>
    </div>
  );
};
