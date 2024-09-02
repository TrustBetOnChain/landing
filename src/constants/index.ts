// export const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
export const ENVIRONMENT = "production";

export const WALLETCONNECT_PROJECT_ID = import.meta.env
  .VITE_WALLETCONNECT_PROJECT_ID;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const ORIGIN = `https://${ENVIRONMENT === "staging" ? "staging." : ""}trustbetonchain.com/`;
