import Identicon from "identicon.js";
export * from "./web3";
import axios from "axios";

export function getTruncatedHash(
  address: string,
  partLength: number = 6,
  frontlength: number = 9,
): string {
  return `${address?.substring(0, frontlength)}...${address?.substring(
    address?.length - partLength,
  )}`;
}

export function getIdenticonSource(hash: string): string {
  const base64source = new Identicon(hash, {
    margin: 0.2,
    background: [0, 0, 0, 0],
    size: 420,
    format: "svg",
  }).toString();

  return `data:image/svg+xml;base64,${base64source}`;
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(value: number, currency?: string) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: currency ? "currency" : undefined,
    currency,
  });

  return formatter.format(value);
}

export function getCompactNumber(value: number, currency?: string): string {
  const formatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    style: currency ? "currency" : undefined,
    currency,
  });
  return formatter.format(value);
}

export const getSolPrice = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "solana",
          vs_currencies: "usd",
        },
      },
    );
    const solPrice = response.data.solana.usd;
    console.log(`The current price of Solana (SOL) in USD is $${solPrice}`);
    return solPrice;
  } catch (error) {
    console.error("Error fetching the price:", error);
  }
};
