import React, { useState } from "react";
import { portfolioData } from "../data/portfolioData";
import { Mail, Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#hero" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3 md:p-4">
      <nav className="flex items-center justify-between w-full max-w-5xl px-5 py-3 rounded-2xl md:rounded-full bg-surface/80 border border-white/10 backdrop-blur-md shadow-lg shadow-purple-900/15">
        <a href="#hero" className="text-sm font-semibold tracking-wide text-white hover:text-accent transition">
          {portfolioData.personal.name}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm text-gray-300">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-white transition">
              {link.name}
            </a>
          ))}
        </div>

        {/* Social Icons & Mobile Toggle */}
        <div className="flex items-center space-x-2 md:space-x-3 text-gray-300">
          <a
            href={portfolioData.personal.socials.github}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition flex items-center justify-center"
            title="GitHub"
          >
            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="#contact"
            className="p-1.5 rounded-full hover:bg-white/10 hover:text-white transition"
            title="Hubungi Saya"
          >
            <Mail size={18} />
          </a>

          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-gray-300 hover:text-white focus:outline-none"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-4 right-4 p-5 bg-surface border border-white/10 rounded-2xl shadow-xl flex flex-col space-y-4 text-sm text-gray-300 md:hidden z-50">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-1 hover:text-accent transition"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};