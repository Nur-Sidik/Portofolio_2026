import React from "react";
import { portfolioData } from "../data/portofolioData";
import { Meteors } from "./ui/Meteors";
import { ArrowUpRight } from "lucide-react";

export const Hero = () => {
  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-4 overflow-hidden pt-24">
      <Meteors number={25} />
      
      <div className="relative z-10 max-w-3xl">
        <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wide text-accent bg-accent/10 border border-accent/20 rounded-full">
          Universitas Muhammadiyah Yogyakarta
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyanAccent">{portfolioData.personal.name}</span>
        </h1>
        
        <p className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
          {portfolioData.personal.bio}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-white bg-accent hover:bg-accent/80 transition shadow-lg shadow-accent/20"
          >
            Lihat Project <ArrowUpRight size={16} />
          </a>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full text-sm font-medium text-gray-300 bg-surface border border-white/10 hover:bg-surfaceHover transition"
          >
            Hubungi Saya
          </a>
        </div>
      </div>
    </section>
  );
};