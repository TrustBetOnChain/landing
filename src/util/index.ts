import Identicon from "identicon.js";
export * from "./web3";

export function getTruncatedHash(
  address: string,
  partLength: number = 6,
): string {
  return `${address.substring(0, partLength)}...${address.substring(
    address.length - partLength,
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
