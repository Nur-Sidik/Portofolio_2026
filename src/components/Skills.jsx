import React, { useState } from "react";
import { portfolioData } from "../data/portfolioData";

export const Skills = () => {
  const [activeTab, setActiveTab] = useState("core");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const currentSkills = portfolioData.skills?.[activeTab] || [];

  // Ambil daftar kategori unik secara aman
  const categories = React.useMemo(() => {
    const unique = Array.from(new Set(currentSkills.map((s) => s.category)));
    return ["All", ...unique];
  }, [currentSkills]);

  const filteredSkills =
    selectedCategory === "All"
      ? currentSkills
      : currentSkills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-14 sm:py-20 px-3 sm:px-6 max-w-5xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1.5 sm:mb-2">
          Tech Stack & Tools
        </h2>
        <p className="text-xs sm:text-sm text-gray-400">
          Teknologi yang saya gunakan dalam membangun solusi perangkat lunak.
        </p>
      </div>

      {/* Main Tab: Core vs Deepening */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="p-1 bg-surface border border-white/10 rounded-full flex gap-1">
          <button
            onClick={() => {
              setActiveTab("core");
              setSelectedCategory("All");
            }}
            className={`px-3.5 sm:px-6 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium rounded-full transition cursor-pointer ${activeTab === "core"
                ? "bg-accent text-white shadow-md shadow-accent/20"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Core & Frequently Used
          </button>
          <button
            onClick={() => {
              setActiveTab("exploring");
              setSelectedCategory("All");
            }}
            className={`px-3.5 sm:px-6 py-1.5 sm:py-2 text-[11px] sm:text-sm font-medium rounded-full transition cursor-pointer ${activeTab === "exploring"
                ? "bg-accent text-white shadow-md shadow-accent/20"
                : "text-gray-400 hover:text-white"
              }`}
          >
            Currently Deepening
          </button>
        </div>
      </div>

      {/* Sub Category Filters */}
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-8 sm:mb-10 min-h-[36px]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-medium transition cursor-pointer ${selectedCategory === cat
                ? "bg-white/10 text-cyanAccent border border-cyanAccent/30"
                : "bg-surface/50 text-gray-400 border border-white/5 hover:text-white hover:border-white/10"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 
        Kunci Perubahan: 
        1. Ditambahkan min-h-[320px] sm:min-h-[420px] agar tingginya tetap stabil saat item sedikit.
        2. content-start agar card tetap rapi di atas dan tidak melar/renggang ke bawah.
      */}
      <div className="min-h-[320px] sm:min-h-[420px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4 content-start">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="group flex items-center space-x-2.5 sm:space-x-3.5 p-2.5 sm:p-3.5 rounded-xl bg-surface/60 border border-white/5 hover:border-accent/40 transition hover:bg-surfaceHover/70 shadow-sm h-[60px] sm:h-[68px]"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain shrink-0 group-hover:scale-110 transition duration-300"
                loading="lazy"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] sm:text-sm font-semibold text-gray-200 group-hover:text-white truncate">
                  {skill.name}
                </span>
                <span className="text-[9px] sm:text-[10px] text-gray-500 truncate">
                  {skill.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};