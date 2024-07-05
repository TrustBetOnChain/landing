export const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
// export const ENVIRONMENT = import.meta.env.VITE_STAGING_ENVIRONMENT;
export const WALLETCONNECT_PROJECT_ID = import.meta.env
  .VITE_WALLETCONNECT_PROJECT_ID;

export const ORIGIN = `https://${ENVIRONMENT === "staging" ? "staging." : ""}trustbetonchain.com/`;
