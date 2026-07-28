"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const navigationItems = [
  { id: "programa", label: "La carrera" },
  { id: "plan", label: "Plan de estudios" },
  { id: "aplicacion", label: "Aplicación profesional" },
  { id: "campus", label: "Campus y validez" },
  { id: "admisiones", label: "Admisión" },
] as const;

export function ProgramSectionNav() {
  const [activeId, setActiveId] = useState<string>(navigationItems[0].id);
  const progressRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const triggers = navigationItems.flatMap((item) => {
      const section = document.getElementById(item.id);
      if (!section) return [];

      return [
        ScrollTrigger.create({
          end: "bottom center",
          onEnter: () => setActiveId(item.id),
          onEnterBack: () => setActiveId(item.id),
          start: "top center",
          trigger: section,
        }),
      ];
    });

    const progressTrigger = ScrollTrigger.create({
      end: "max",
      onUpdate: (self) => {
        if (progressRef.current) {
          gsap.set(progressRef.current, {
            scaleX: self.progress,
            transformOrigin: "left center",
          });
        }
      },
      start: 0,
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      progressTrigger.kill();
    };
  }, []);

  return (
    <nav
      aria-label="Navegación de la ficha"
      className="sticky top-[4.25rem] z-30 border-b border-slate-200 bg-white/94 shadow-sm backdrop-blur-md sm:top-20"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 bg-[#e7a928]"
        ref={progressRef}
      />
      <div className="mx-auto flex max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-10">
        {navigationItems.map((item) => {
          const active = item.id === activeId;

          return (
            <a
              aria-current={active ? "location" : undefined}
              className={`group relative inline-flex min-h-14 shrink-0 items-center px-4 text-sm font-bold transition-colors first:pl-0 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#e7a928] ${
                active
                  ? "text-[#04215e]"
                  : "text-slate-500 hover:text-[#04215e]"
              }`}
              href={`#${item.id}`}
              key={item.id}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-4 bottom-0 h-0.5 origin-left bg-[#04215e] transition-transform duration-300 first:left-0 ${
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
