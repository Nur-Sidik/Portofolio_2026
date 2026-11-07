import React, { useMemo } from "react";
import { cn } from "../../lib/utils";

export const Meteors = ({ number = 35, className }) => {
  const meteors = useMemo(() => {
    return Array.from({ length: number }).map((_, i) => ({
      id: i,
      // Sebar meteor dari luar layar kiri sampai melewati layar kanan
      left: Math.floor(Math.random() * 160 - 30) + "%",
      delay: Math.random() * 5 + "s",
      duration: Math.floor(Math.random() * 6 + 4) + "s",
    }));
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map((el) => (
        <span
          key={el.id}
          className={cn(
            "animate-meteor absolute top-0 h-0.5 w-0.5 rounded-[9999px] bg-cyanAccent shadow-[0_0_0_1px_#ffffff20] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[80px] before:h-[2px] before:bg-gradient-to-r before:from-cyanAccent before:via-purple-500 before:to-transparent",
            className
          )}
          style={{
            top: "-20px",
            left: el.left,
            animationDelay: el.delay,
            animationDuration: el.duration,
          }}
        />
      ))}
    </div>
  );
};