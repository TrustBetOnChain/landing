export const useSafari = () => {
  const ua = navigator.userAgent;
  const isSafari = ua.includes("Safari") && !ua.includes("Chrome");
  return { isSafari };
};
