import { Hero } from "@/components/Home/Hero";
import { Marquee } from "@/components/Home/Marquee";
import { About } from "@/components/Home/About";
import { Works } from "@/components/Home/Works";
import { Testimonials } from "@/components/Home/Testimonials";
import { Pricing } from "@/components/Home/Pricing";
import { Contact } from "@/components/Home/Contact";

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
