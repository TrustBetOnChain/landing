import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@dotlottie/react-player/dist/index.css";
import { WalletConnectProvider } from "./WalletConnectProvider";
// import { CLUSTER, ENDPOINT } from "./presale/config/vars.ts";
// import { ENVIRONMENT, ORIGIN } from "./constants/index.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhantomContextState from "./Context/PhantomContextState.tsx";

// console.log("CLUSTER:", CLUSTER);
// console.log("ORIGIN:", ORIGIN);
// console.log("ENVIRONEMNT:", ENVIRONMENT);
// console.log("ENDPOINT:", ENDPOINT);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WalletConnectProvider>
      <PhantomContextState>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </PhantomContextState>
    </WalletConnectProvider>
  </React.StrictMode>,
);
