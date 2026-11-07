import React from "react";
import { portfolioData } from "../data/portfolioData";
import { ArrowUpRight, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { Lanyard } from "./ui/Lanyard";

export const Hero = () => {
  return (
    <section id="hero" className="relative flex items-center justify-center min-h-[92vh] px-4 pt-24 pb-16 scroll-mt-24 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
        {/* Kolom Kiri: Teks & Tombol Aksi */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-medium text-gray-300 bg-surface/80 border border-purple-500/30 rounded-full backdrop-blur-md shadow-lg shadow-purple-950/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
            <span>Available for Freelance & Projects</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-300 to-cyanAccent">
              {portfolioData.personal.name}
            </span>
          </h1>

          <div className="flex items-center gap-2 text-cyanAccent text-sm font-mono mb-6 bg-cyanAccent/10 px-3 py-1 rounded-md border border-cyanAccent/20">
            <Terminal size={16} />
            <span>Full-Stack Web Developer & IT Student</span>
          </div>

          <p className="text-sm sm:text-base text-gray-400 mb-8 leading-relaxed max-w-xl">
            {portfolioData.personal.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
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

        {/* Kolom Kanan: 3D Physics Lanyard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative z-10"
        >
          <Lanyard />
        </motion.div>
      </div>
    </section>
  );
};