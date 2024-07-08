import { SupportedToken } from "../../../presale/types";

export const Coin = {
  SOL: "SOL",
  ETH: "ETH",
  BTC: "BTC",
  USDC: "USDC",
  USDT: "USDT",
} satisfies Record<SupportedToken, SupportedToken>;

export type Coin = (typeof Coin)[keyof typeof Coin];
