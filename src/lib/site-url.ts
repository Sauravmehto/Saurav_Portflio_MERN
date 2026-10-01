export function siteUrl() {
  // URL is Netlify's built-in primary site URL.
  const value = (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL)?.trim();
  return value && value.length > 0 ? value.replace(/\/$/, "") : "http://localhost:3000";
}
