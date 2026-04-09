export const Marquee = () => {
  const techs = [
    "REACT",
    "TYPESCRIPT",
    "NODE.JS",
    "POSTGRESQL",
    "NEXT.JS",
    "TAILWIND",
    "DOCKER",
    "N8N",
    "AI",
    "AWS",
    "PYTHON",
    "RUST",
  ];

  return (
    <div className="bg-primary-text text-white py-6 overflow-hidden">
      <div className="marquee-content whitespace-nowrap bg-primary-text">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-4 bg-primary-text">
            {techs.map((tech) => (
              <span
                key={tech}
                className="text-4xl md:text-6xl font-heading font-black flex bg-primary-text items-center gap-8"
              >
                {tech} <span className="text-secondary bg-primary-text">/</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
