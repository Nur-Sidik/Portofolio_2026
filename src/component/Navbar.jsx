import React from "react";
import { portfolioData } from "../data/portofolioData";
import { Github, Linkedin, Mail } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <nav className="flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full bg-surface/70 border border-white/10 backdrop-blur-md shadow-lg shadow-purple-900/10">
        <a href="#hero" className="text-sm font-semibold tracking-wide text-white hover:text-accent transition">
          {portfolioData.personal.name}
        </a>
        <div className="hidden md:flex items-center space-x-6 text-sm text-gray-300">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#skills" className="hover:text-white transition">Skills</a>
          <a href="#experience" className="hover:text-white transition">Experience</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
        <div className="flex items-center space-x-3 text-gray-300">
          <a href={portfolioData.personal.socials.github} target="_blank" rel="noreferrer" className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition">
            <Github size={18} />
          </a>
          <a href={portfolioData.personal.socials.email} className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition">
            <Mail size={18} />
          </a>
        </div>
      </nav>
    </header>
  );
};