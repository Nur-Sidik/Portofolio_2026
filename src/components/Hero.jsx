import React from "react";
import { portfolioData } from "../data/portfolioData";
import { ArrowUpRight, Sparkles, Terminal } from "lucide-react";
import heroImg from "../assets/hero.png";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-[92vh] text-center px-4 pt-28 pb-16 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl flex flex-col items-center"
      >
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-medium text-gray-300 bg-surface/80 border border-purple-500/30 rounded-full backdrop-blur-md shadow-lg shadow-purple-950/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
          <span>Available for Freelance & Projects</span>
        </div>

        {/* Foto Profil dengan Orbital Glow */}
        <div className="relative mb-6 group cursor-pointer">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-accent via-cyanAccent to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-700 animate-tilt" />
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-white/20 p-1 bg-surface">
            <img
              src={heroImg}
              alt={portfolioData.personal.name}
              className="w-full h-full rounded-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight">
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-300 to-cyanAccent drop-shadow-sm">
            {portfolioData.personal.name}
          </span>
        </h1>

        <div className="flex items-center gap-2 text-cyanAccent text-sm sm:text-base font-mono mb-4 bg-cyanAccent/10 px-3 py-1 rounded-md border border-cyanAccent/20">
          <Terminal size={16} />
          <span>Full-Stack Web Developer & IT Student</span>
        </div>

        <p className="text-sm sm:text-base text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto px-2">
          {portfolioData.personal.bio}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-accent to-purple-600 hover:from-purple-500 hover:to-accent transition shadow-lg shadow-purple-600/30 hover:scale-105 duration-300"
          >
            Lihat Project <ArrowUpRight size={16} />
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-gray-200 bg-surface/90 border border-white/10 hover:border-accent/40 hover:bg-surfaceHover transition hover:scale-105 duration-300"
          >
            Hubungi Saya
          </a>
        </div>
      </motion.div>
    </section>
  );
};