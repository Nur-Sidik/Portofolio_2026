import React from "react";
import { Navbar } from "./component/Navbar";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skill";

function App() {
  return (
    <div className="min-h-screen bg-background text-gray-200">
      <Navbar />
      <main>
        <Hero />
        <Skills />
      </main>
    </div>
  );
}

export default App;