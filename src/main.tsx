import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@dotlottie/react-player/dist/index.css";
import { WalletConnectProvider } from "./WalletConnectProvider";
import { CLUSTER, ENDPOINT } from "./presale/config/vars.ts";
import {
  ENVIRONMENT,
  ORIGIN,
  WALLETCONNECT_PROJECT_ID,
} from "./constants/index.ts";

console.log("CLUSTER:", CLUSTER);
console.log("ORIGIN:", ORIGIN);
console.log("ENVIRONEMNT:", ENVIRONMENT);
console.log("ENDPOINT:", ENDPOINT);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WalletConnectProvider>
      <App />
    </WalletConnectProvider>
  </React.StrictMode>,
);
