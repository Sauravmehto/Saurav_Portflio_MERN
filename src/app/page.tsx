import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Skills } from "@/components/skills/skills";
import { ExperienceSection } from "@/components/experience/experience";
import { Projects } from "@/components/projects/projects";
import { Playground } from "@/components/playground/playground";
import { Testimonials } from "@/components/testimonials/testimonials";
import { Contact } from "@/components/contact/contact";
import { Guestbook } from "@/components/contact/guestbook";
import { getFeaturedRepos } from "@/lib/github";
import { getApprovedNotes } from "@/lib/guestbook";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

export default async function Home() {
  const [repos, guestbook] = await Promise.all([getFeaturedRepos(), getApprovedNotes()]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <ExperienceSection />
        <Projects />
        <Playground repos={repos} />
        {siteConfig.testimonialsEnabled && <Testimonials />}
        <Contact />
        <Guestbook available={guestbook.available} notes={guestbook.notes} />
      </main>
      <Footer />
    </>
  );
}
