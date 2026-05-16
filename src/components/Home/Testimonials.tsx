export const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "THE ARCHITECTURE DELIVERED FOR OUR INFRA-LAYER WAS BEYOND EXPECTATIONS. PURE TECHNICAL EXCELLENCE.",
      author: "MARCUS VANE",
      role: "CTO, HYPERSTREAM",
      colorTag: "bg-secondary",
      bgColor: "bg-white",
      quoteColor: "text-red-500",
    },
    {
      quote:
        "A RARE BLEND OF BRUTALIST AESTHETIC AND ROCK-SOLID SYSTEM ENGINEERING. THEY SPEAK BOTH DESIGN AND CODE FLUENTLY.",
      author: "ELENA ROSS",
      role: "LEAD DESIGNER, NEXUS LABS",
      colorTag: "bg-red-500",
      bgColor: "bg-secondary",
      quoteColor: "text-primary-text",
    },
    {
      quote:
        "CLEAN CODE, RAPID DEPLOYMENT, AND A UNIQUE PERSPECTIVE ON USER INTERACTION. A VITAL COLLABORATOR.",
      author: "SATOSHI K.",
      role: "FOUNDER, PROTOCOL-X",
      colorTag: "bg-blue-600",
      bgColor: "bg-white",
      quoteColor: "text-red-500",
    },
  ];

  return (
    <section
      id="testimonial"
      className="bg-[#E7483B] p-6 md:p-12 lg:p-20 border-b-2 lg:border-b-4 border-brand-dark"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-4">
        <h2 className="text-primary text-6xl font-bold leading-none uppercase tracking-tighter">
          TRANSMISSION_LOGS
        </h2>
        <div className="flex flex-col mb-2">
          <span className="text-primary font-bold tracking-widest text-sm md:text-base uppercase pb-2">
            CLIENT
            <br />
            FEEDBACK
          </span>
          <div className="h-1 w-full bg-primary"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className={`border-4 border-brand-dark p-8 md:p-12 ${t.bgColor} shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] flex flex-col justify-between min-h-100`}
          >
            <div>
              <span className={`text-6xl font-black italic ${t.quoteColor}`}>
                //
              </span>
              <p className="mt-8 text-xl md:text-2xl font-bold uppercase leading-snug text-primary-text">
                {t.quote}
              </p>
            </div>
            <div className="mt-16 w-full">
              <div className="h-0.5 w-full bg-primary-text opacity-30 mb-8"></div>
              <div className="flex items-center gap-6">
                <div
                  className={`w-10 h-10 border-2 border-brand-dark ${t.colorTag}`}
                ></div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-primary-text uppercase">
                    {t.author}
                  </span>
                  <span className="text-[10px] md:text-xs text-primary-text opacity-70 uppercase font-bold tracking-wider">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
