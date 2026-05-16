import { ExternalLink, Pencil } from "lucide-react";
import DeleteSvg from "@/components/svg/DeleteSvg";
import Link from "next/link";
import GithubSvg from "@/components/svg/GithubSvg";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  status: "LIVE" | "BETA" | "DRAFT";
  tags: string[];
  repo: string;
  live: string;
  image: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ProjectCard = ({
  title,
  description,
  status,
  tags,
  onEdit,
  onDelete,
  repo,
  live,
  image,
}: ProjectCardProps) => {
  const statusColor = {
    LIVE: "bg-secondary",
    BETA: "bg-purple-200",
    DRAFT: "bg-gray-100",
  }[status];

  return (
    <div className="brutalist-border-thick bg-white brutalist-shadow-lg group flex flex-col scale-100">
      <div className="h-55 bg-gray-100 border-b-2 border-brand-dark relative flex items-center justify-center group-hover:bg-brand-cream transition-colors overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`text-[10px] px-2 py-0.5 brutalist-border font-black uppercase tracking-widest ${statusColor}`}
          >
            {status}_PHASE
          </span>
        </div>
        {image ? (
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 brutalist-border opacity-20 group-hover:opacity-40 transition-opacity flex items-center justify-center">
            <ExternalLink size={32} />
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            {repo && (
              <Link href={repo} target="_blank">
                <GithubSvg />
              </Link>
            )}
          </div>
        </div>

        <p className="text-xs font-bold text-zinc-500 mb-6 leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-black uppercase border border-gray-300 px-1.5 py-0.5 tracking-tighter bg-gray-50"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button
            onClick={onEdit}
            className="brutalist-border py-3 text-[10px] font-black tracking-widest uppercase hover:bg-secondary transition-colors flex items-center justify-center gap-2"
          >
            <Pencil className="size-3.5" />
            EDIT
          </button>
          <button
            onClick={onDelete}
            className="brutalist-border py-3 text-[10px] font-black tracking-widest uppercase hover:bg-red-500 hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            <DeleteSvg />
            DELETE
          </button>
        </div>
        <Link href={live || ""} target="_blank">
          <button
            disabled={!live}
            className="w-full disabled:opacity-65 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:cursor-not-allowed brutalist-border mt-2 py-3 text-[10px] flex items-center gap-2 justify-center font-black tracking-widest uppercase bg-secondary hover:translate-x-0.5 hover:translate-y-0.5 transition-all brutalist-shadow"
          >
            LIVE_PREVIEW_SITE
            <ExternalLink className="size-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};
