import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { FreelanceSection } from "@/components/freelance/freelance-section";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Freelance — ${siteConfig.name}`,
  description: `Freelance projects built by ${siteConfig.name}.`,
};

export default function FreelancePage() {
  return (
    <>
      <Nav />
      <main>
        <FreelanceSection />
      </main>
      <Footer />
    </>
  );
}
