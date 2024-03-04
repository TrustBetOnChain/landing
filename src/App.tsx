import "./App.css";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Main } from "./components/main/main";
import { Cards } from "./components/cards/cards";
import { Future } from "./components/future/future";
import { Benefits } from "./components/benefits/benefits";
import { Payouts } from "./components/payouts/payouts";
import { HowToStart } from "./components/howtostart/howtostart";
import { ConnectWallet } from "./components/connectwallet/connectwallet";
import { TokenDetails } from "./components/tokendetails/tokendetails";
import { ContactUs } from "./components/contactus/contactus";
import { WalletConnectProvider } from "./WalletConnectProvider";

function App() {
  return (
    <>
      <WalletConnectProvider>
        <Header />
        <main>
          <Main />
          <Cards />
          <Future />
          <Benefits />
          <Payouts />
          <HowToStart />
          <ConnectWallet />
          <TokenDetails />
          <ContactUs />
        </main>
        <Footer />
      </WalletConnectProvider>
    </>
  );
}

export default App;
