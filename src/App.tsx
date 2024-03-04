
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
import { Roadmap } from "./components/roadmap/roadmap";

function App() {

  return (
    <>
      <Header />
      <main>
        <Main />
        <Cards />
        <Future />
        <Benefits />
        <Payouts />
        <HowToStart />
        <Roadmap />
        <ConnectWallet />
        <TokenDetails />
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}

export default App;
