import React, { useState } from "react";
import { portfolioData } from "../data/portofolioData";

export const Skills = () => {
  const [activeTab, setActiveTab] = useState("core");

  return (
    <section id="skills" className="py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Tech Stack & Tools</h2>
        <p className="text-sm text-gray-400">Teknologi yang saya gunakan dalam membangun solusi perangkat lunak.</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-10">
        <div className="p-1 bg-surface border border-white/10 rounded-full flex gap-1">
          <button
            onClick={() => setActiveTab("core")}
            className={`px-5 py-2 text-xs md:text-sm font-medium rounded-full transition ${
              activeTab === "core"
                ? "bg-accent text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Core & Frequently Used
          </button>
          <button
            onClick={() => setActiveTab("exploring")}
            className={`px-5 py-2 text-xs md:text-sm font-medium rounded-full transition ${
              activeTab === "exploring"
                ? "bg-accent text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Currently Deepening
          </button>
        </div>
      </div>

      {/* Grid Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {portfolioData.skills[activeTab].map((skill, index) => (
          <div
            key={index}
            className="group flex flex-col p-4 rounded-xl bg-surface/50 border border-white/5 hover:border-accent/40 transition hover:bg-surfaceHover/60 relative overflow-hidden"
          >
            <span className="text-xs text-gray-500 mb-1 group-hover:text-cyanAccent transition">
              {skill.category}
            </span>
            <span className="text-sm font-medium text-gray-200 group-hover:text-white transition">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};