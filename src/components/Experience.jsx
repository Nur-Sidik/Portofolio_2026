import React from "react";
import { portfolioData } from "../data/portfolioData";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export const Experience = () => {
    return (
        <section id="experience" className="py-20 px-4 max-w-5xl mx-auto scroll-mt-24">
            <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Experience</h2>
                <p className="text-sm text-gray-400">
                    Riwayat kontribusi profesional, pengajaran laboratorium, dan kepemimpinan proyek.
                </p>
            </div>

            <div className="relative border-l-2 border-gradient-to-b from-accent via-cyanAccent to-purple-900 ml-4 md:ml-28 space-y-12">
                {portfolioData.experience.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        className="relative pl-8 group"
                    >
                        {/* Glowing Icon Dot */}
                        <div className="absolute -left-[17px] top-1 p-2 rounded-full bg-surface border border-accent text-cyanAccent shadow-[0_0_15px_rgba(139,92,246,0.6)] group-hover:scale-125 transition duration-300">
                            <Briefcase size={14} />
                        </div>

                        {/* Card Content */}
                        <div className="p-6 rounded-2xl bg-surface/60 border border-white/10 hover:border-accent/50 hover:bg-surfaceHover/80 transition shadow-lg">
                            <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full bg-accent/15 text-cyanAccent border border-cyanAccent/30">
                                {item.period}
                            </span>
                            <h3 className="text-lg font-bold text-white group-hover:text-accent transition">{item.role}</h3>
                            <p className="text-sm font-medium text-purple-300 mb-3">{item.company}</p>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};