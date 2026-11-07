import React from "react";
import { Meteors } from "./Meteors";

export const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid Pattern lebih kontras dengan garis halus */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 40%, transparent 90%)"
        }}
      />
      
      {/* Multi-color ambient nebula blobs */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/20 blur-[160px] rounded-full" />
      <div className="absolute top-[40%] -left-32 w-[500px] h-[400px] bg-cyanAccent/15 blur-[150px] rounded-full" />
      <div className="absolute top-[75%] -right-32 w-[550px] h-[450px] bg-purple-700/15 blur-[150px] rounded-full" />

      {/* Meteors */}
      <Meteors number={15} />
    </div>
  );
};