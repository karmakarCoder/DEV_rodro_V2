"use client";

import React, { useEffect, useState } from "react";
import { Edit3, CheckCircle2, AlertCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPublic } from "@/hooks/axios/useAxiosPublic";

type HeroData = {
  title?: string;
  description?: string;
};

const fetchHero = async (): Promise<HeroData> => {
  const res = await axiosPublic.get<HeroData>("/hero");
  return res.data;
};

const updateHero = async (payload: HeroData): Promise<HeroData> => {
  const res = await axiosPublic.post<HeroData>("/hero", payload);
  return res.data;
};

export const QuickEdit = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<HeroData>({
    queryKey: ["hero"],
    queryFn: fetchHero,
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Populate fields once data is fetched
  useEffect(() => {
    if (data) {
      setTitle(data.title ?? "");
      setDescription(data.description ?? "");
    }
  }, [data]);

  const mutation = useMutation<HeroData, Error, HeroData>({
    mutationFn: updateHero,
    onSuccess: (newData) => {
      queryClient.setQueryData(["hero"], newData);
    },
  });

  const handleSubmit = () => {
    if (!title.trim() && !description.trim()) return;
    mutation.mutate({ title: title.trim(), description: description.trim() });
  };

  return (
    <div className="brutalist-border-thick bg-blue-600 text-primary p-6 brutalist-shadow-lg w-full md:w-80">
      <div className="flex items-center gap-2 mb-6">
        <Edit3 size={20} />
        <h3 className="text-lg font-black uppercase tracking-tighter">
          HERO QUICK EDIT
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-black tracking-widest uppercase block mb-1">
            MAIN HEADLINE
          </label>
          <input
            type="text"
            value={isLoading ? "Loading..." : title}
            disabled={isLoading}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white text-primary-text p-2 brutalist-border text-xs font-bold outline-none uppercase disabled:opacity-50"
          />
        </div>

        <div>
          <label className="text-[10px] font-black tracking-widest uppercase block mb-1">
            DESCRIPTION SUBTEXT
          </label>
          <textarea
            rows={4}
            value={isLoading ? "Loading..." : description}
            disabled={isLoading}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white text-primary-text p-2 brutalist-border text-xs font-bold outline-none disabled:opacity-50"
          />
        </div>

        {/* Status feedback */}
        {mutation.isSuccess && (
          <div className="flex items-center gap-2 text-xs font-bold">
            <CheckCircle2 size={14} />
            <span>Saved successfully!</span>
          </div>
        )}
        {mutation.isError && (
          <div className="flex items-center gap-2 text-xs font-bold text-red-200">
            <AlertCircle size={14} />
            <span>Save failed. Check connection.</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={mutation.isPending || isLoading}
          className="w-full bg-secondary text-primary-text py-3 brutalist-border font-black tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Saving..." : "SAVE CHANGES"}
        </button>
      </div>
    </div>
  );
};
