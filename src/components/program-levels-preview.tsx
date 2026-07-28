import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programs } from "@/data/programs";
import type { ProgramLevel } from "@/types/content";

const levelCards: Array<{
  level: ProgramLevel;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  layout: string;
  sizes: string;
}> = [
  {
    level: "Bachillerato",
    title: "Bachilleratos",
    description:
      "Formación media superior con preparación técnica en informática administrativa, trabajo social o turismo.",
    href: "/oferta-academica/bachilleratos",
    image: "/images/BACHILLERATO.png",
    imageAlt: "Graduada de bachillerato recibiendo un reconocimiento en UNIVAMEX",
    layout: "xl:col-span-5 xl:row-span-2 xl:min-h-[41rem]",
    sizes: "(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    level: "Licenciatura",
    title: "Licenciaturas",
    description:
      "Programas en tecnología, negocios, derecho, educación, creatividad, medios y turismo.",
    href: "/oferta-academica/licenciaturas",
    image: "/images/LICENCIATURAS.png",
    imageAlt: "Comunidad de licenciaturas durante una ceremonia académica de UNIVAMEX",
    layout: "xl:col-span-7 xl:min-h-[20rem]",
    sizes: "(min-width: 1280px) 58vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    level: "Maestría",
    title: "Maestrías",
    description:
      "Educación y Juicios Orales para fortalecer la práctica y actualización profesional.",
    href: "/oferta-academica/maestrias",
    image: "/images/MAESTRIAS.png",
    imageAlt: "Estudiante de maestría de UNIVAMEX",
    layout: "xl:col-span-4 xl:min-h-[20rem]",
    sizes: "(min-width: 1280px) 34vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    level: "Doctorado",
    title: "Doctorado",
    description:
      "Investigación en educación, neurociencias y perspectiva de género.",
    href: "/oferta-academica/doctorados",
    image: "/images/UNIVAMEX22.png",
    imageAlt: "Actividad académica de posgrado en UNIVAMEX",
    layout: "xl:col-span-3 xl:min-h-[20rem]",
    sizes: "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw",
  },
];

export function ProgramLevelsPreview() {
  return (
    <section
      className="relative z-10 -mt-px bg-[#f8fafc] px-4 py-10 text-[#071a3d] sm:px-6 sm:py-14 lg:px-10 lg:py-20"
      id="oferta"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between"
          data-motion="rise"
        >
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-[#b45309]">
              Oferta académica vigente
            </p>
            <h2 className="mt-2 font-heading text-[1.75rem] font-semibold leading-[1.04] sm:mt-3 sm:text-4xl sm:leading-[1.02] lg:text-5xl">
              Elige el nivel que quieres estudiar
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-lg sm:leading-7">
              Explora cada nivel y continúa a su página para conocer programas,
              modalidades y fichas académicas.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 w-fit items-center gap-2 border border-[#04215e] px-5 text-sm font-bold text-[#04215e] transition duration-200 hover:bg-[#04215e] hover:text-white"
            href="/oferta-academica"
          >
            Ver toda la oferta
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div
          className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2 xl:mt-10 xl:grid-cols-12 xl:grid-rows-2"
          data-motion-group
        >
          {levelCards.map((card) => {
            const count = programs.filter(
              (program) => program.level === card.level,
            ).length;

            return (
              <article
                className={`group relative min-h-[17rem] min-w-0 overflow-hidden border border-slate-200 bg-[#071a3d] transition duration-500 hover:-translate-y-1 hover:border-[#e7a928] hover:shadow-2xl hover:shadow-slate-950/15 focus-within:-translate-y-1 focus-within:border-[#e7a928] focus-within:shadow-2xl focus-within:shadow-slate-950/15 sm:min-h-[22rem] ${card.layout}`}
                data-motion-item
                key={card.level}
              >
                <Link
                  className="relative flex h-full min-h-[inherit] flex-col justify-between overflow-hidden p-4 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-[#f2bd46] sm:p-8"
                  href={card.href}
                >
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes={card.sizes}
                    className="object-cover transition duration-700 ease-out group-hover:scale-105 group-focus-within:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,33,94,0.12)_0%,rgba(4,33,94,0.46)_45%,rgba(3,19,49,0.96)_100%)]" />
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <span className="border border-white/35 bg-[#04215e]/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                      {count} {count === 1 ? "programa" : "programas"}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-6 w-6 text-[#f2bd46] transition duration-200 group-hover:translate-x-1"
                    />
                  </div>

                  <div className="relative z-10 max-w-xl">
                    <h3 className="font-editorial text-[1.55rem] font-semibold leading-none text-white sm:text-[2.15rem]">
                      {card.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-5 text-white/78 sm:mt-3 sm:text-base sm:leading-6">
                      {card.description}
                    </p>
                    <span className="mt-3 inline-flex min-h-10 items-center border-b border-[#f2bd46] text-sm font-bold text-white sm:mt-5 sm:min-h-11">
                      Explorar {card.title.toLowerCase()}
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
