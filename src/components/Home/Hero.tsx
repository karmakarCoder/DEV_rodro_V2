import Image from "next/image";
import { Button } from "../common/Button";
import ScrollDownSvg from "../svg/scrollDownSvg";
import rodro from "../../assets/rodro.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center px-6 md:px-12 pt-20 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <h1 className="text-[12vw] leading-none font-bold uppercase md:text-8xl mb-8 tracking-tighter">
            HEy👋
            <br />
            this is <br />
            <span className="bg-secondary px-4 inline-block">your rodro</span>
            <br />
            karmakar <br />
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12">
            <div className="relative z-20">
              <div className="bg-primary-text h-full absolute -bottom-1 -right-1 -z-10 w-full"></div>
              <a href="#work">
                <Button
                  size="md"
                  className="hidden sm:inline-flex bg-primary-text text-primary"
                >
                  VIEW PROJECTS
                </Button>
              </a>
            </div>

            <div className="flex items-center text-primary-text gap-2 text-base font-bold tracking-widest uppercase">
              <ScrollDownSvg />
              SCROLL TO EXPLORE
            </div>
          </div>
        </div>

        <div className="relative order-first lg:order-last flex justify-center lg:justify-end">
          <div className="relative w-64 h-80 md:w-80 md:h-100 border-2 border-brand-dark brutalist-shadow bg-zinc-200">
            <Image
              src={rodro}
              alt="Profile"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              priority
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary brutalist-border -z-10 md:block hidden" />
        </div>
      </div>
    </section>
  );
};
