import React from "react";
import { Wrench, ArrowRight } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-primary-text relative overflow-hidden font-SpaceGrotesk flex flex-col items-center justify-center p-4 md:p-8 selection:bg-black selection:text-white">
      {/* Background Watermarks */}
      <div className="absolute top-10 left-10 text-[25vw] font-black text-black/5 leading-none select-none pointer-events-none">
        04
      </div>
      <div className="absolute bottom-[-5%] right-10 text-[18vw] font-black text-black/5 leading-none select-none pointer-events-none">
        B 004
      </div>

      <div className="w-full max-w-6xl relative z-10 flex flex-col gap-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            {/* System Offline Box */}
            <div className="bg-[#FFD600] brutalist-border-thick brutalist-shadow-lg p-8 relative">
              <h2 className="text-6xl md:text-[80px] font-black uppercase leading-none tracking-tighter mb-8 border-b-4 border-primary-text pb-6 inline-block w-full">
                SYSTEM_
                <br />
                OFFLINE
              </h2>
              <div className="flex items-start gap-4">
                <Wrench className="size-8 shrink-0 mt-1" />
                <p className="font-bold uppercase tracking-widest text-sm max-w-70">
                  Optimizing neural pathways.
                  <br />
                  Check back shortly.
                </p>
              </div>
            </div>

            {/* Deployment Progress Box */}
            <div className="bg-white brutalist-border-thick brutalist-shadow-lg p-6">
              <div className="flex justify-between font-black text-xs tracking-widest uppercase mb-4">
                <span>DEPLOYMENT PROGRESS</span>
                <span>85%</span>
              </div>
              <div className="w-full h-10 border-4 border-[#1a1a1a] p-1 bg-white">
                <div className="h-full bg-[#E53935] w-[85%] relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-white/20 w-[200%] animate-[marquee_2s_linear_infinite]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)",
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between font-bold text-[10px] text-gray-500 tracking-widest uppercase mt-4">
                <span>INITIATING RE-INDEX...</span>
                <span>STUCK AT 0x8F92</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8 h-full">
            {/* Terminal Box */}
            <div className="bg-[#1a1a1a] text-[#00FF41] brutalist-border-thick brutalist-shadow-lg p-6 flex flex-col flex-1 min-h-[400px]">
              <div className="flex justify-between items-center border-b-2 border-gray-700 pb-4 mb-4">
                <span className="text-[#FFD600] font-bold text-xs tracking-widest uppercase">
                  STATUS_LOG.SH
                </span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                </div>
              </div>

              <div className="font-mono text-xs leading-[1.8] space-y-1 opacity-90 overflow-hidden">
                <p>
                  &gt; Loading asset_pipeline...{" "}
                  <span className="text-white">DONE</span>
                </p>
                <p>
                  &gt; Re-indexing NeoBrutalist_Stack... <br />
                  <span className="text-white">IN_PROGRESS</span>
                </p>
                <p>
                  &gt; Compressing Space_Grotesk_Weights...{" "}
                  <span className="text-white">OK</span>
                </p>
                <p>
                  &gt; Flushing cache_layer...{" "}
                  <span className="text-white">OK</span>
                </p>
                <p className="text-gray-400">
                  &gt; Awaiting external handshake...
                </p>
                <p className="text-yellow-500">
                  &gt; Syncing shadow_dom fragments...
                </p>
                <p className="text-yellow-500">
                  &gt; Verifying geometric_integrity...
                </p>
                <p className="text-yellow-500">
                  &gt; Optimizing layout_engine_v3...
                </p>
                <p>&gt; Injecting NeoBrutalism.css...</p>
                <p>&gt; Purging unused typography weights...</p>
                <p>&gt; Refactoring kernel_interface...</p>
                <p>&gt; Verifying geometric_integrity...</p>
                <p className="animate-pulse">
                  &gt; Purging unused typography weights...
                </p>
              </div>
            </div>

            {/* Contact Support Button */}
            <button className="bg-[#2962FF] text-white brutalist-border-thick brutalist-shadow-lg p-6 flex items-center justify-center gap-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group w-full">
              <span className="text-xl font-black tracking-widest uppercase">
                Contact Support
              </span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="mt-4 bg-white brutalist-border-thick brutalist-shadow-lg flex flex-col md:flex-row items-stretch">
          <div className="bg-[#1a1a1a] text-white px-6 py-4 font-black text-xs tracking-widest uppercase whitespace-nowrap w-full md:w-auto text-center flex items-center justify-center">
            LATEST_INCIDENT
          </div>
          <div className="p-4 overflow-hidden whitespace-nowrap w-full relative flex items-center bg-white">
            <div className="marquee-content font-bold text-xs tracking-widest uppercase">
              <span className="pr-10">
                // ERROR_042: EXCESSIVE_BRUTALISM_DETECTED //
                AUTO_SCALING_SERVICES_REBOOTING //
              </span>
              <span className="pr-10">
                // ERROR_042: EXCESSIVE_BRUTALISM_DETECTED //
                AUTO_SCALING_SERVICES_REBOOTING //
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
