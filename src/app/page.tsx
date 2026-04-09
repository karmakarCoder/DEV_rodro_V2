import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Works } from "@/components/Works";
import { Testimonials } from "@/components/Testimonials";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div>
      <Hero />
      <Marquee />
      <About />
      <Works />
      <Testimonials />
      <Pricing />
      <Contact />
    </div>
  );
}
