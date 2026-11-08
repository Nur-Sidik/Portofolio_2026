import React from "react";
import { portfolioData } from "../data/portfolioData";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export const Projects = () => {
  return (
    <section id="projects" className="py-14 sm:py-20 px-3 sm:px-4 max-w-5xl mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-1.5 sm:mb-2">
          Featured Projects
        </h2>
        <p className="text-xs sm:text-sm text-gray-400">
          Kompilasi aplikasi web dan inisiatif sistem yang pernah saya bangun.
        </p>
      </div>

      {/* Grid: 2 Kolom di HP, 3 Kolom di Layar Besar */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 items-stretch">
        {portfolioData.projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col h-full rounded-xl sm:rounded-2xl bg-surface/60 border border-white/10 hover:border-accent/60 hover:shadow-xl hover:shadow-purple-900/20 transition-all duration-300 group overflow-hidden"
          >
            {/* Bagian Atas: Header Mockup + Deskripsi Teks (mengisi ruang sisa) */}
            <div className="flex-1 flex flex-col">
              {/* Header Mockup */}
              <div className="w-full min-h-[90px] sm:min-h-[130px] bg-gradient-to-br from-purple-900/40 via-surface to-background border-b border-white/10 p-3 sm:p-5 flex flex-col justify-between group-hover:from-purple-900/60 transition duration-300">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  {/* Window Dot Buttons */}
                  <div className="flex space-x-1 sm:space-x-1.5">
                    <div className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  {/* Actions Link */}
                  <div className="flex items-center space-x-1.5 sm:space-x-2 text-gray-300">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 sm:p-1.5 rounded-full bg-surface/80 hover:bg-white/20 hover:text-white transition flex items-center justify-center"
                        title="Source Code"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {project.link && project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 sm:p-1.5 rounded-full bg-surface/80 hover:bg-cyanAccent/20 hover:text-cyanAccent transition flex items-center justify-center"
                        title="Live Demo"
                      >
                        <ExternalLink size={13} className="sm:w-4 sm:h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Judul Project: boleh turun ke baris kedua, tidak dipotong "..." */}
                <h3 className="text-xs sm:text-base md:text-lg font-bold leading-snug text-white group-hover:text-accent transition">
                  {project.title}
                </h3>
              </div>

              {/* Teks Deskripsi: tinggi minimum seragam (garis sejajar), boleh melebar kalau teks panjang */}
              <div className="p-2.5 sm:p-5 flex-1">
                <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 leading-relaxed min-h-[85px] sm:min-h-[130px]">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Badges Tech Stack: tinggi minimum seragam (garis sejajar), melebar otomatis kalau badge banyak */}
            <div className="px-2.5 sm:px-5 pb-2.5 sm:pb-5 pt-2.5 sm:pt-4 border-t border-white/10 min-h-[95px] sm:min-h-[150px] flex content-start flex-wrap gap-1 sm:gap-1.5">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-xs font-mono rounded bg-white/5 text-gray-300 border border-white/10 h-fit"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};