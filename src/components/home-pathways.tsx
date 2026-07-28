"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { useEffect, useState } from "react";

const stories = [
  {
    navLabel: "Aprendizaje",
    title: "Aprendizaje aplicado",
    description:
      "La experiencia académica combina clases, espacios de práctica y proyectos que conectan el aula con decisiones reales.",
    image: "/images/UNIVAMEX STOCK 8.jpg",
    imageAlt: "Estudiante de UNIVAMEX durante una clase",
    href: "/oferta-academica",
    cta: "Explorar programas",
  },
  {
    navLabel: "Admisiones",
    title: "Admisiones claras",
    description:
      "Ubica requisitos, documentos y pasos para que el proceso de ingreso se sienta ordenado desde el primer contacto.",
    image: "/images/UNIVAMEX STOCK 07.jpg",
    imageAlt: "Atención a estudiantes en UNIVAMEX",
    href: "/admisiones",
    cta: "Revisar admisiones",
  },
  {
    navLabel: "Campus",
    title: "Campus",
    description:
      "Conoce las sedes, sus espacios, mapas y rutas para preparar tu visita con información clara.",
    image: "/images/instalaciones1.jpg",
    imageAlt: "Vista exterior del Campus Ciudad Azteca de UNIVAMEX",
    href: "/campus",
    cta: "Conocer los campus",
  },
] as const;

export function HomePathways() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const activeStory = stories[activeIndex];

  useEffect(() => {
    if (reduceMotion || isInteracting || isManuallyPaused) return;

    const timeout = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % stories.length);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, isInteracting, isManuallyPaused, reduceMotion]);

  return (
    <section
      aria-label="Historias de la experiencia UNIVAMEX"
      className="bg-[#f3f6fb] px-4 py-10 text-[#071a3d] sm:px-6 sm:py-14 lg:px-10 lg:py-20"
      onBlurCapture={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
    >
      <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)] lg:items-center lg:gap-14">
        <div data-motion="rise">
          <p className="text-sm font-bold text-[#b45309]">Tu ruta en UNIVAMEX</p>
          <h2 className="mt-2 max-w-[20ch] text-balance font-heading text-[1.75rem] font-semibold leading-[1.04] text-[#04215e] sm:mt-3 sm:text-[2.55rem] sm:leading-[1.02] lg:text-[2.8rem]">
            Elegir programa también debe sentirse acompañado
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-5 text-slate-600 sm:mt-6 sm:max-w-md sm:text-base sm:leading-7">
            Recorre el valor académico, el proceso de admisión y los campus sin
            perder el contexto de tu decisión.
          </p>

          <div className="mt-4 flex items-center gap-2 sm:mt-8">
            <button
              aria-label="Historia anterior"
              className="grid h-11 w-11 place-items-center border border-[#cbd5e1] bg-white text-[#04215e] transition duration-200 hover:border-[#04215e] hover:bg-[#04215e] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] sm:h-12 sm:w-12"
              type="button"
              onClick={() =>
                setActiveIndex((index) =>
                  index === 0 ? stories.length - 1 : index - 1,
                )
              }
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              aria-label="Historia siguiente"
              className="grid h-11 w-11 place-items-center border border-[#cbd5e1] bg-white text-[#04215e] transition duration-200 hover:border-[#04215e] hover:bg-[#04215e] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] sm:h-12 sm:w-12"
              type="button"
              onClick={() =>
                setActiveIndex((index) => (index + 1) % stories.length)
              }
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              aria-label={
                isManuallyPaused
                  ? "Reanudar avance automático"
                  : "Pausar avance automático"
              }
              aria-pressed={isManuallyPaused}
              className="grid h-11 w-11 place-items-center border border-[#cbd5e1] bg-white text-[#04215e] transition duration-200 hover:border-[#04215e] hover:bg-[#04215e] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] sm:h-12 sm:w-12"
              type="button"
              onClick={() => setIsManuallyPaused((paused) => !paused)}
            >
              {isManuallyPaused ? (
                <Play aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Pause aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>

          <div aria-hidden="true" className="mt-4 grid grid-cols-3 gap-2 sm:mt-8">
            {stories.map((story, index) => (
              <span className="h-1 bg-slate-300" key={story.title}>
                <motion.span
                  className="block h-full origin-left bg-[#04215e]"
                  animate={{ scaleX: index === activeIndex ? 1 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                />
              </span>
            ))}
          </div>
        </div>

        <div
          className="min-w-0 overflow-hidden bg-white shadow-2xl shadow-slate-950/10"
          data-motion-media
        >
          <div aria-live="polite" className="relative grid overflow-hidden bg-[#04215e]">
            <AnimatePresence initial={false} mode="sync">
              <motion.article
                className="relative overflow-hidden bg-[#04215e] text-white [grid-area:1/1]"
                initial={reduceMotion ? false : { x: "100%" }}
                animate={{ x: 0 }}
                exit={reduceMotion ? undefined : { x: "-100%" }}
                key={activeStory.title}
                transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative aspect-video overflow-hidden bg-[#dfe5ee]">
                  <Image
                    src={activeStory.image}
                    alt={activeStory.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 57vw, 100vw"
                    className="object-contain"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,33,94,0)_8%,rgba(4,33,94,0.16)_34%,rgba(4,33,94,0.82)_66%,rgba(4,33,94,0.98)_100%)]" />
                  <span className="absolute right-3 top-3 bg-[#04215e]/78 px-2.5 py-1.5 font-editorial text-xl font-semibold text-[#f2bd45] backdrop-blur-sm sm:right-6 sm:top-6 sm:px-3 sm:py-2 sm:text-3xl">
                    0{activeIndex + 1}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-7 lg:p-8">
                    <h3 className="font-editorial text-lg font-semibold leading-none sm:text-2xl lg:text-3xl">
                      {activeStory.title}
                    </h3>
                    <div className="mt-1.5 flex items-end justify-between gap-3 sm:mt-3 sm:gap-5">
                      <p className="max-w-xl flex-1 text-[0.68rem] leading-4 text-white/88 sm:text-sm sm:leading-6">
                        {activeStory.description}
                      </p>
                      <Link
                        className="inline-flex min-h-8 shrink-0 items-center gap-2 border-b border-[#e7a928] text-[0.68rem] font-bold text-white transition hover:border-white sm:min-h-10 sm:text-xs"
                        href={activeStory.href}
                      >
                        {activeStory.cta}
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-3 gap-2 p-2 sm:p-3">
            {stories.map((story, index) => (
              <button
                aria-current={index === activeIndex ? "step" : undefined}
                aria-label={`Seleccionar ${story.title.toLowerCase()}`}
                className={`min-h-12 min-w-0 border px-2 text-center text-[0.7rem] font-bold leading-tight transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] sm:min-h-14 sm:px-3 sm:text-xs ${
                  index === activeIndex
                    ? "border-[#04215e] bg-[#04215e] text-white"
                    : "border-slate-200 bg-white text-slate-500 hover:border-[#04215e] hover:text-[#04215e]"
                }`}
                key={story.title}
                type="button"
                onClick={() => setActiveIndex(index)}
              >
                {story.navLabel}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
