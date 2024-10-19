export const getRedirectFromUrl = (searchParams: string): string => {
  const params = new URLSearchParams(searchParams);

  const redirectUrl = params.get("redirect") || "/";

  return redirectUrl;
};
