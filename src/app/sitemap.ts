import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/freelance`, lastModified: new Date() },
  ];
}
