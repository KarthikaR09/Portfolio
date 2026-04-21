import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { PageLoader } from "@/components/page-loader";
import { GsapReveal } from "@/components/gsap-reveal";

export default function Home() {
  return (
    <>
      <PageLoader />
      <main className="relative">
        <Hero />
        <GsapReveal direction="up" duration={1}>
          <About />
        </GsapReveal>
        <GsapReveal direction="up" duration={1}>
          <Experience />
        </GsapReveal>
        <GsapReveal direction="up" duration={1}>
          <Projects />
        </GsapReveal>
        <GsapReveal direction="up" duration={1}>
          <Skills />
        </GsapReveal>
        <GsapReveal direction="up" duration={1}>
          <Contact />
        </GsapReveal>
        <Footer />
      </main>
    </>
  );
}
