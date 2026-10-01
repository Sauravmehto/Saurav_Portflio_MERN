export function siteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return value && value.length > 0 ? value.replace(/\/$/, "") : "http://localhost:3000";
}
