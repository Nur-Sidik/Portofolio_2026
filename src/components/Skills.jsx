import React, { useState } from "react";
import { portfolioData } from "../data/portfolioData";

export const Skills = () => {
  const [activeTab, setActiveTab] = useState("core");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const currentSkills = portfolioData.skills[activeTab];

  // Ambil daftar kategori unik
  const categories = ["All", ...new Set(currentSkills.map((s) => s.category))];

  const filteredSkills = selectedCategory === "All"
    ? currentSkills
    : currentSkills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-20 px-4 max-w-5xl mx-auto scroll-mt-24">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Tech Stack & Tools</h2>
        <p className="text-xs sm:text-sm text-gray-400">Teknologi yang saya gunakan dalam membangun solusi perangkat lunak.</p>
      </div>

      {/* Main Tab: Core vs Deepening */}
      <div className="flex justify-center mb-6">
        <div className="p-1 bg-surface border border-white/10 rounded-full flex gap-1">
          <button
            onClick={() => { setActiveTab("core"); setSelectedCategory("All"); }}
            className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium rounded-full transition ${activeTab === "core" ? "bg-accent text-white shadow-md shadow-accent/20" : "text-gray-400 hover:text-white"
              }`}
          >
            Core & Frequently Used
          </button>
          <button
            onClick={() => { setActiveTab("exploring"); setSelectedCategory("All"); }}
            className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium rounded-full transition ${activeTab === "exploring" ? "bg-accent text-white shadow-md shadow-accent/20" : "text-gray-400 hover:text-white"
              }`}
          >
            Currently Deepening
          </button>
        </div>
      </div>

      {/* Sub Category Filters */}
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${selectedCategory === cat
                ? "bg-white/10 text-cyanAccent border border-cyanAccent/30"
                : "bg-surface/50 text-gray-400 border border-white/5 hover:text-white hover:border-white/10"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Skills dengan Icon Asli */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {filteredSkills.map((skill, index) => (
          <div
            key={index}
            className="group flex items-center space-x-3.5 p-3.5 rounded-xl bg-surface/60 border border-white/5 hover:border-accent/40 transition hover:bg-surfaceHover/70 shadow-sm"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 group-hover:scale-110 transition duration-300"
              loading="lazy"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white truncate">
                {skill.name}
              </span>
              <span className="text-[10px] text-gray-500 truncate">
                {skill.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};