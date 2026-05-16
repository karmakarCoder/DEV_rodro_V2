"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Terminal, ShieldAlert } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/auth/login", data);
      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "AUTHENTICATION_FAILED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-4 font-mono">
      {/* Background Shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 border-4 border-black/10 rounded-xl -rotate-12 hidden md:block"></div>
      <div className="absolute bottom-40 right-20 w-40 h-40 bg-black/5 rotate-12 hidden md:block"></div>
      <div className="absolute top-1/2 left-10 w-4 h-40 bg-red-200 hidden md:block"></div>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mt-4">
          <span className="bg-black text-white px-3 py-1 text-xs font-bold tracking-widest">
            v2.0.4
          </span>
          <div className="w-8 h-8 bg-red-500 flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Terminal size={16} className="text-white" />
          </div>
        </div>
      </div>

      {/* Main Auth Box */}
      <div className="relative max-w-lg">
        <div className="absolute inset-0.5 bg-black translate-x-2 translate-y-2"></div>
        <div className="relative w-full  bg-white border-4 border-black p-8 md:p-10 z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-4 h-4 bg-red-500"></div>
            <h2 className="text-xl font-black uppercase tracking-tighter">
              SYSTEM AUTHENTICATION
            </h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-500 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <ShieldAlert className="text-red-600" />
              <p className="text-[10px] font-black uppercase text-red-600">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest block text-gray-500">
                IDENTIFIER
              </label>
              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="ADMIN_USER_01"
                  className="w-full bg-transparent border-b-4 border-black py-2 font-black uppercase outline-none focus:placeholder-transparent placeholder:text-gray-200"
                />
              </div>
              {errors.email && (
                <p className="text-[9px] font-bold text-red-500 uppercase mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest block text-gray-500">
                ACCESS_CODE
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type="password"
                  placeholder="********"
                  className="w-full bg-transparent border-b-4 border-black py-2 font-black outline-none focus:placeholder-transparent placeholder:text-gray-200"
                />
              </div>
              {errors.password && (
                <p className="text-[9px] font-bold text-red-500 uppercase mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFD700] hover:bg-[#FFC000] text-black py-5 border-4 border-black font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50"
            >
              {loading ? "AUTHENTICATING..." : "AUTHENTICATE"}
              <ArrowRight size={20} strokeWidth={3} />
            </button>
          </form>

          <div className="mt-12 flex justify-center items-center text-[8px] font-bold uppercase tracking-widest text-gray-400 border-t-2 border-gray-100 pt-6">
            <div className="flex items-center gap-2">
              <Lock size={10} />
              <span>ENCRYPTED SHELL V2.4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex gap-4 mt-12">
        <div className="w-10 h-10 bg-black border-2 border-black"></div>
        <div className="w-10 h-10 bg-[#FFD700] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
        <div className="w-10 h-10 bg-red-500 border-2 border-black flex items-center justify-center">
          <span className="text-white font-bold">X</span>
        </div>
        <div className="w-10 h-10 border-2 border-black"></div>
      </div>
    </div>
  );
}
