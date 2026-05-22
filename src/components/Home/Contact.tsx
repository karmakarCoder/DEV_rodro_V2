"use client";
import { Button } from "../common/Button";

export const Contact = () => {
  const links = [
    { name: "HELLO@BAUHAUS.DEV", url: "" },
    { name: "HELLO@BAUHAUS.DEV", url: "" },
    { name: "HELLO@BAUHAUS.DEV", url: "" },
  ];
  return (
    <section
      id="contact"
      className="grid grid-cols-1 lg:grid-cols-2 border-t-2 border-brand-dark bg-brand-cream"
    >
      <div className="p-8 md:p-20 flex flex-col md:justify-between md:min-h-125">
        <div>
          <h2 className="text-5xl md:text-[120px] font-bold leading-[0.85] mb-12">
            LETS <br />
            BUILD <br />
            STUFF.
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {links?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <span className="size-8 flex items-center justify-center border-3 border-brand-dark font-mono text-xs group-hover:bg-secondary transition-colors">
                0{index + 1}
              </span>
              <span className="font-heading font-bold text-lg">
                {item?.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 md:p-20 flex items-center justify-center">
        <form
          className="w-full max-w-md border-2 border-brand-dark p-8 shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] flex flex-col gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-2">
            <label className="text-[10px] font-heading font-bold tracking-widest uppercase opacity-60">
              Subject Line
            </label>
            <input
              type="text"
              placeholder="Project Inquiry"
              className="w-full border-b-3 border-brand-dark py-2 focus:outline-none focus:border-brand-yellow transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-heading font-bold tracking-widest uppercase opacity-60">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full border-b-3 border-brand-dark py-2 focus:outline-none focus:border-brand-yellow transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-heading font-bold tracking-widest uppercase opacity-60">
              Project Description
            </label>
            <textarea
              rows={4}
              placeholder="Tell me about your vision..."
              className="w-full border-b-3 border-brand-dark py-2 focus:outline-none focus:border-brand-yellow transition-colors resize-none"
            />
          </div>

          <Button type="submit" className="w-full mt-4 bg-primary-text">
            TRANSMIT DATA
          </Button>
        </form>
      </div>
    </section>
  );
};
