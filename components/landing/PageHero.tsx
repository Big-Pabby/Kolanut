"use client";

import { useEffect, useState } from "react";

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative min-h-[400px] lg:min-h-[500px] flex items-end justify-start px-6 md:px-12 lg:px-20 pb-10 md:pb-16"
      style={{ backgroundColor: "#808080" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex flex-col gap-3 max-w-4xl">
        <h1
          className={`font-heading text-3xl md:text-4xl lg:text-5xl xl:text-[60px] font-bold text-white leading-tight transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {title}
        </h1>
        <p
          className={`text-base md:text-lg lg:text-xl text-white/90 font-body transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
