"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { cn } from "@/lib/utils";

export type HeroSlide = {
  src: string;
  alt: string;
  position: string;
};

const homeSlides = [
  {
    src: "/images/legacy/estudiantes-campus.jpg",
    alt: "Estudiantes de UNIVAMEX conviviendo en el campus",
    position: "70% center",
  },
  {
    src: "/images/legacy/estudiantes-profesional.jpg",
    alt: "Estudiantes de nivel profesional con materiales de estudio",
    position: "64% center",
  },
  {
    src: "/images/legacy/estudiantes-bachillerato.jpg",
    alt: "Estudiantes de bachillerato con libros y carpetas",
    position: "58% center",
  },
] as const;

type HeroProps = {
  titleLines?: readonly string[];
  description?: string;
  slides?: readonly HeroSlide[];
  whatsappQuestion?: string;
  whatsappSource?: string;
};

export function Hero({
  titleLines = ["Decídete a", "llegar más lejos"],
  description = "Bachilleratos, licenciaturas y posgrados en Ecatepec, con acompañamiento para elegir tu programa e iniciar tu proceso.",
  slides = homeSlides,
  whatsappQuestion,
  whatsappSource = "Hero principal",
}: HeroProps = {}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [activeSlide, reduceMotion, slides.length]);

  return (
    <section
      aria-label="Presentación de UNIVAMEX"
      aria-roledescription="carrusel"
      className="relative isolate min-h-[38rem] overflow-hidden bg-[#02183f] text-white sm:min-h-[48rem] lg:min-h-[50rem]"
      data-motion-hero-section
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        data-motion-hero-media
      >
        {slides.map((slide, index) => {
          const active = index === activeSlide;

          return (
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={
                reduceMotion
                  ? { opacity: active ? 1 : 0 }
                  : {
                      opacity: active ? 1 : 0,
                      scale: active ? 1.035 : 1,
                    }
              }
              key={slide.src}
              transition={{
                opacity: { duration: reduceMotion ? 0 : 1.15, ease: "easeInOut" },
                scale: { duration: 5.4, ease: "linear" },
              }}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : "eager"}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: slide.position }}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[#02183f]/12" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,24,63,0.68)_0%,rgba(2,24,63,0.55)_32%,rgba(2,24,63,0.26)_57%,rgba(2,24,63,0.06)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,24,63,0.55)_0%,rgba(2,24,63,0.08)_44%,rgba(2,24,63,0.45)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[38rem] max-w-7xl items-center px-4 pb-16 pt-[6.75rem] sm:min-h-[48rem] sm:px-8 sm:pb-28 sm:pt-[9rem] lg:min-h-[50rem] lg:px-10 lg:pb-28 lg:pt-[9rem]">
        <div className="max-w-[46rem]" data-motion-hero-copy>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="flex flex-col items-start gap-[0.08em] text-[clamp(2.05rem,10vw,2.6rem)] font-medium leading-[0.95] tracking-[-0.035em] drop-shadow-[0_2px_12px_rgba(2,24,63,0.5)] [font-family:var(--font-soft-display)] sm:gap-[0.12em] sm:text-[clamp(4rem,7.2vw,6rem)] sm:leading-[0.92]">
              {titleLines.map((line) => (
                <span className="whitespace-nowrap" key={line}>{line}</span>
              ))}
            </h1>
            <p className="mt-5 max-w-[19rem] text-sm leading-6 text-white/88 sm:mt-6 sm:max-w-[34rem] sm:text-base sm:leading-7">
              {description}
            </p>

            <div className="mt-5 flex flex-nowrap items-center gap-2 sm:mt-7 sm:gap-3">
              <WhatsAppButton
                className="min-h-11 shrink-0 !gap-1.5 !px-3 !py-2 !text-xs sm:!gap-2 sm:!px-4 sm:!text-sm"
                label="Solicitar informes"
                question={whatsappQuestion}
                source={whatsappSource}
                variant="accent"
              />
              <Link
                className="group inline-flex min-h-11 shrink-0 items-center gap-1.5 border border-white/65 bg-[#02183f]/20 px-3 py-2 text-xs font-bold text-white backdrop-blur-[2px] transition hover:border-white hover:bg-white hover:text-[#04215e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928] sm:gap-2 sm:px-4 sm:text-sm"
                href="/oferta-academica"
              >
                Ver oferta académica
                <ArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-[#e7a928] transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div
        aria-label="Seleccionar imagen del hero"
        className="absolute bottom-12 right-5 z-20 flex items-center gap-1 sm:bottom-14 sm:right-8 lg:right-10"
        role="group"
      >
        {slides.map((slide, index) => (
          <button
            aria-current={index === activeSlide ? "true" : undefined}
            aria-label={`Mostrar imagen ${index + 1}: ${slide.alt}`}
            className="group grid min-h-11 min-w-11 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e7a928]"
            key={slide.src}
            type="button"
            onClick={() => setActiveSlide(index)}
          >
            <span
              className={cn(
                "block h-0.5 w-8 transition-colors duration-300",
                index === activeSlide
                  ? "bg-[#e7a928]"
                  : "bg-white/45 group-hover:bg-white",
              )}
            />
          </button>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-14 bg-[#f8fafc] [clip-path:polygon(0_72%,100%_28%,100%_100%,0_100%)] sm:h-20"
      />
    </section>
  );
}
