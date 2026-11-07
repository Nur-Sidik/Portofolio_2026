import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { GlobalBackground } from "./components/ui/GlobalBackground";

function App() {
  return (
    <div className="relative min-h-screen bg-background text-gray-200">
      {/* Background Grid + Continuous Meteors */}
      <GlobalBackground />

      {/* Main Content Layer */}
      <div className="relative z-10">
        <Navbar />
        <main className="space-y-6 md:space-y-12">
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;