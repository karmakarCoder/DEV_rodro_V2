export const About = () => {
  const stats = [
    { value: "05+", label: "YEARS OF EXPERIENCE" },
    { value: "42", label: "PROJECTS SHIPPED", highlight: true },
    { value: "99%", label: "LIGHTHOUSE SCORE" },
    { value: "10+", label: "client satisfaction" },
  ];

  return (
    <section
      id="about"
      className="grid grid-cols-1 lg:grid-cols-2 min-h-screen"
    >
      <div className="p-8 md:p-20 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-brand-dark">
        <span className="bg-red-500 text-white text-sm font-bold px-2 py-0.5 w-fit mb-6 tracking-widest uppercase">
          DISCOVERY
        </span>
        <h2 className="text-5xl uppercase md:text-7xl mb-8 leading-[1.1] font-bold">
          FULL-STACK <br />
          developer & <br />
          SYSTEM <br />
          DESIGNER.
        </h2>
        <p className="font-sans text-xl md:text-2xl text-zinc-600 max-w-xl leading-relaxed">
          I build software that thinks and acts. I’m a Full-Stack Developer
          specializing in the intersection of web development, AI, and
          automation. I combine robust coding with n8n and AI to create systems
          that don't just look good, but actually run themselves. My goal is
          simple: Build apps that eliminate manual work and scale effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-2 border-b-2">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-8 md:p-12 flex flex-col text-center items-center text-primary-text justify-center gap-2 border-brand-dark 
              ${i % 2 === 0 ? "border-r-2" : ""} 
              ${i < 2 ? "border-b-2" : ""}
              ${stat.highlight ? "bg-secondary" : "bg-transparent"}
            `}
          >
            <span className="text-6xl md:text-8xl font-heading font-black bg-transparent">
              {stat.value}
            </span>
            <span className="text-[10px] md:text-xs font-bold tracking-widest opacity-60 uppercase bg-transparent">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
