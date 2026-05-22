"use client";
import { useProjects } from "@/hooks/useProjects";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GithubSvg from "../svg/GithubSvg";

export const Works = () => {
  const { projectsQuery } = useProjects();

  return (
    <section id="work" className="p-6 md:p-12">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-6xl font-bold">SELECTED WORKS</h2>
        <span className="text-xs font-heading font-bold underline cursor-pointer">
          V.2026 RELEASE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsQuery?.isPending
          ? [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="relative border-3 border-brand-dark animate-pulse 
  shadow-[12px_12px_0px_0px_rgba(26,26,26,1)]"
              >
                <div className="relative h-64 md:h-80 border-b-3 border-brand-dark overflow-hidden bg-zinc-200">
                  <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-size-[20px_20px] opacity-10" />
                  <div className="absolute top-4 right-4 h-5 w-16 bg-zinc-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-8 w-48 bg-zinc-300" />
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-zinc-300" />
                      <div className="h-5 w-5 rounded-full bg-zinc-300" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 w-full bg-zinc-200" />
                    <div className="h-4 w-4/5 bg-zinc-200" />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="h-7 w-16 border-3 border-zinc-300 bg-zinc-200"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          : projectsQuery?.data?.slice(0, 3)?.map((project, i) => (
              <div
                key={i}
                className={`group relative border-3 border-brand-dark transition-all duration-300 active:shadow-[0px_0px_0px_0px_rgba(26,26,26,1)] shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] 
              
            `}
              >
                {project.image ? (
                  <div className="relative h-64 md:h-80 border-b-3 border-brand-dark overflow-hidden bg-zinc-100">
                    <Image
                      src={project?.image}
                      alt={project?.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-size-[20px_20px] opacity-10" />
                    <span className="absolute top-4 right-4 bg-primary-text text-primary text-[10px] px-2 py-1 z-10 uppercase">
                      {project.status}
                    </span>
                  </div>
                ) : (
                  <div className="h-64 md:h-80 border-b-3 border-brand-dark flex items-center justify-center relative overflow-hidden">
                    <span className="text-[200px] font-black opacity-10 absolute -bottom-10 -right-10">
                      3
                    </span>
                    <span className="absolute top-4 right-4 bg-blue-600 text-primary text-[10px] px-2 py-1 z-20">
                      {project.status}
                    </span>
                  </div>
                )}

                <div className="p-6 group-hover:bg-primary-text duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl md:text-3xl mb-4 font-semibold group-hover:text-secondary group-hover:bg-primary-text transition-colors inline-block px-1">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2 group-hover:text-secondary">
                      {project?.repo && (
                        <Link href={project?.repo} target="_blank">
                          <GithubSvg />
                        </Link>
                      )}
                      <ExternalLink
                        size={20}
                        className="cursor-pointer text-gray-400"
                      />
                    </div>
                  </div>

                  <p className="font-sans text-sm font-medium text-zinc-600 mb-6 line-clamp-2 group-hover:text-[#E8E3DA]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
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
        <div className="border-2  p-12 flex flex-col items-center justify-center text-center bg-zinc-100 border-dashed">
          <div className="w-16 h-16 border-2 border-brand-dark flex items-center justify-center mb-6">
            <span className="font-mono text-2xl font-bold">{"<>"}</span>
          </div>
          <h3 className="text-2xl mb-2">MORE ON THE WAY</h3>
          <p className="text-xs font-sans text-zinc-500 mb-8 max-w-115 uppercase">
            Currently building KTA+ faith-centered education ecosystem that
            integrates curriculum, live teaching, bundles, communities,
          </p>
          <Link
            href="https://github.com/karmakarCoder?tab=repositories"
            target="_blank"
          >
            <button className="border-2 border-brand-dark px-6 uppercase py-2 text-xs font-heading font-bold hover:bg-primary-text hover:text-primary transition-colors">
              MOre
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
