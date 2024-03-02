
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
        <ConnectWallet />
      </main>
      <Footer />
    </>
  );
}

export default App;
