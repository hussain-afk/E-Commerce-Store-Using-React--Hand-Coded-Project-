import React from 'react';
import { ArrowRight, ShoppingBag, Star, ShieldCheck, Zap } from 'lucide-react';

export default function EcommerceHero() {
  return (
    <div 
      className="w-full bg-slate-950 text-slate-400 relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-20 border-b border-slate-900"
      style={{
        msOverflowStyle: 'none',  /* IE and Edge */
        scrollbarWidth: 'none'    /* Firefox */
      }}
    >
      {/* Target all children and containers to suppress scroll rendering */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: Editorial Copywriting & Direct CTAs */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          {/* Fresh Announcement Tag */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold text-blue-400 tracking-wide">
            <Zap size={12} className="text-blue-400 fill-blue-400/30" />
            <span>Drop 04 // Extended Modular Ecosystem</span>
          </div>

          {/* Core Value Proposition Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.15]">
            Hardware architecture <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              built to endure.
            </span>
          </h1>

          {/* Clean product narrative descriptor */}
          <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed max-w-xl">
            Engineered minimalist workspace tools, everyday technical travel garments, and high-performance hardware modules designed to optimize remote production and distributed workflows. 
          </p>

          {/* Interactive primary actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-bold py-3 px-6 rounded-xl text-xs tracking-wide shadow-lg shadow-blue-900/20 transition-all">
              <ShoppingBag size={14} />
              <span>Shop Latest Release</span>
              <ArrowRight size={14} className="ml-1" />
            </button>
            
            <button className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white font-bold py-3 px-6 rounded-xl text-xs tracking-wide transition-all active:scale-[0.98]">
              Browse Technical Specs
            </button>
          </div>

          {/* Horizontal mini trust badges */}
          <div className="pt-8 border-t border-slate-900/80 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] font-bold tracking-wide uppercase text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-500" />
              <span>2-Year System Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Free Worldwide Dispatch Route</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Modern Asymmetric Graphic Product Showcase Card */}
        <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
          {/* Added overflow-hidden to the outer bounding frame to completely isolate floating items */}
          <div className="w-full max-w-[460px] bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-4 shadow-2xl shadow-black relative group overflow-hidden">
            
            {/* Visual product mock layout frame */}
            <div className="w-full aspect-[4/5] bg-slate-950/80 rounded-2xl border border-slate-900/60 flex flex-col justify-between p-6 relative">
              
              {/* Product Card Flag indicators */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black tracking-widest text-slate-600 uppercase">SYSTEM ID // 909-V4</span>
                <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md text-[10px] font-bold">
                  <Star size={10} className="fill-amber-400" />
                  <span>4.9 Rated</span>
                </div>
              </div>

              {/* Central Abstract Technical Wireframe Graphics */}
              <div className="my-auto py-8 flex items-center justify-center relative">
                <div className="w-44 h-44 rounded-full border border-dashed border-slate-800 flex items-center justify-center animate-[spin_180s_linear_infinite]">
                  <div className="w-32 h-32 rounded-full border border-slate-900 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border border-dashed border-slate-800" />
                  </div>
                </div>
                <div className="absolute p-4 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-inner text-blue-500 group-hover:text-blue-400 group-hover:scale-105 transition-all duration-300">
                  <ShoppingBag size={28} />
                </div>
              </div>

              {/* Editorial Item Product Information Block */}
              <div className="space-y-1 text-left">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-black text-white tracking-tight group-hover:text-blue-400 transition-colors">
                    Nexus Workpack Alpha
                  </h3>
                  <span className="text-base font-black text-white">$245</span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Weatherproof modular ballistic nylon daily carry container with specialized internal component trays.
                </p>
              </div>

            </div>

            {/* FLOATING DECORATIVE BADGE (Contained inside parent frame bounds to prevent window scroll) */}
            <div className="absolute bottom-8 left-2 bg-slate-900 border border-slate-800 py-2.5 px-4 rounded-xl shadow-xl shadow-black/80 flex items-center gap-2.5 max-w-[160px]">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <div className="text-left leading-none">
                <p className="text-[11px] font-black text-white uppercase tracking-wider">Low Stock</p>
                <p className="text-[9px] text-slate-500 font-bold mt-1">Only 14 items left</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
} 