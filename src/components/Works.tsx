import Image from "next/image";

const projects = [
  {
    title: "HYPERSCALE INFRASTRUCTURE",
    description:
      "Cloud-native hosting platform built on serverless infrastructure for optimized resource allocation.",
    tags: ["REACT", "GO", "AWS"],
    image: "/project1.png",
    status: "RE-RELEASING",
  },
  {
    title: "SYNTH-LOGICS DASHBOARD",
    description:
      "Data processing engine serving long-array loading heavy compute with visual patterns.",
    tags: ["NEXT.JS", "TRPC", "D3.JS"],
    status: "V.2024 RELEASE",
    isYellow: true,
  },
  {
    title: "CORE-NEXUS FRAMEWORK",
    description:
      "Lightweight state management library designed for low-power embedded systems.",
    tags: ["TYPESCRIPT", "WASM"],
    image: "/project2.png",
    status: "UPCOMING",
  },
];

export const Works = () => {
  return (
    <section id="work" className="p-6 md:p-12">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-6xl font-bold">SELECTED WORKS</h2>
        <span className="text-xs font-heading font-bold underline cursor-pointer">
          V.2024 RELEASE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <div
            key={i}
            className={`group relative border-3 border-brand-dark transition-all duration-300 active:shadow-[0px_0px_0px_0px_rgba(26,26,26,1)] shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] 
              
            `}
          >
            {project.image ? (
              <div className="relative h-64 md:h-80 border-b-3 border-brand-dark overflow-hidden bg-zinc-100">
                {/* Fallback pattern if image doesn't exist yet */}
                <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-size-[20px_20px] opacity-10" />
                <span className="absolute top-4 right-4 bg-primary-text text-white text-[10px] px-2 py-1 z-10">
                  {project.status}
                </span>
              </div>
            ) : (
              <div className="h-64 md:h-80 border-b-3 border-brand-dark flex items-center justify-center relative overflow-hidden">
                <span className="text-[200px] font-black opacity-10 absolute -bottom-10 -right-10">
                  3
                </span>
                <span className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] px-2 py-1 z-20">
                  {project.status}
                </span>
              </div>
            )}

            <div className="p-6 group-hover:bg-primary-text duration-300">
              <h3 className="text-2xl md:text-3xl mb-4 font-semibold group-hover:text-secondary group-hover:bg-brand-dark transition-colors inline-block px-1">
                {project.title}
              </h3>
              <p className="font-sans text-sm font-medium text-zinc-600 mb-6 line-clamp-2 group-hover:text-[#E8E3DA]">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-heading font-bold border-3 border-brand-dark px-2 py-1 group-hover:border-secondary group-hover:text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* "More on the way" card */}
        <div className="border-2 border-brand-dark brutalist-shadow p-12 flex flex-col items-center justify-center text-center bg-zinc-100 border-dashed">
          <div className="w-16 h-16 border-2 border-brand-dark flex items-center justify-center mb-6">
            <span className="font-mono text-2xl font-bold">{"<>"}</span>
          </div>
          <h3 className="text-2xl mb-2">MORE ON THE WAY</h3>
          <p className="text-xs font-sans text-zinc-500 mb-8 max-w-50">
            CURRENTLY WORKING ON THE NEXT GENERATION OF ML TOOLS.
          </p>
          <button className="border-2 border-brand-dark px-6 py-2 text-xs font-heading font-bold hover:bg-primary-text hover:text-white transition-colors">
            ARCHIVE.ZIP
          </button>
        </div>
      </div>
    </section>
  );
};
