import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { CommandPalette } from "@/components/command-palette";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { siteConfig } from "@/lib/site-config";
import { siteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const url = siteUrl();
const title = `${siteConfig.name} — ${siteConfig.role}`;
const description = `${siteConfig.name} is a full stack and AI software engineer in ${siteConfig.location}, building production web platforms and applied-AI products.`;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: title,
    template: `%s — ${siteConfig.name}`,
  },
  description,
  openGraph: {
    title,
    description,
    url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  email: siteConfig.email,
  url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressCountry: "IN",
  },
  sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        {/* The in-editor browser stamps data-cursor-ref onto the DOM before
            hydration. Strip those tags until the document has loaded so React
            does not treat them as a server/client mismatch. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function strip(){document.querySelectorAll("[data-cursor-ref]").forEach(function(n){n.removeAttribute("data-cursor-ref")})}strip();var o=new MutationObserver(strip);o.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["data-cursor-ref"]});addEventListener("load",function(){strip();setTimeout(function(){o.disconnect()},0)})})();`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider>
          <SmoothScrollProvider>
            <ScrollProgress />
            <div aria-hidden className="grain-overlay" />
            <CustomCursor />
            {children}
            <CommandPalette />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
