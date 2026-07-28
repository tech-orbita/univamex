import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Landmark, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteMotionShell } from "@/components/site-motion-shell";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { institutionalContent } from "@/data/institutional";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Conoce la historia, misión, visión, filosofía, valores y símbolos institucionales de UNIVAMEX en Ecatepec.",
  alternates: {
    canonical: "/quienes-somos",
  },
};

const offerFacts = Object.entries(institutionalContent.currentOffer);

export default function QuienesSomosPage() {
  return (
    <SiteMotionShell>
      <PageHero
        title="Quiénes somos"
        description="Conoce el origen, los principios y la identidad que han guiado a UNIVAMEX durante 50 años."
        image="/images/UNIVAMEX26.png"
        imageClassName="object-[65%_center]"
      />

      <section className="bg-[#f8fafc] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-10">
          <div data-motion="rise">
            <p className="text-sm font-bold text-[#b45309]">
              {institutionalContent.experienceYears} años de experiencia
            </p>
            <h2 className="mt-2 max-w-xl font-heading text-[1.75rem] font-semibold leading-[1.04] text-[#04215e] sm:mt-3 sm:text-4xl sm:leading-[1.02] lg:text-5xl">
              {institutionalContent.introduction.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {institutionalContent.introduction.description}
            </p>
            <div
              className="mt-5 grid grid-cols-2 gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:mt-8 sm:grid-cols-4"
              data-motion-group
            >
              {offerFacts.map(([level, count]) => (
                <div className="bg-white p-3 sm:p-5" data-motion-item key={level}>
                  <strong className="block font-heading text-3xl font-semibold text-[#04215e]">
                    {count}
                  </strong>
                  <span className="mt-1 block text-sm text-slate-600">
                    {level === "Doctorado" ? level : `${level}s`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-200" data-motion-media>
            <Image
              src="/images/UNIVAMEX STOCK 04.jpg"
              alt="Comunidad estudiantil de UNIVAMEX en el campus"
              width={1672}
              height={941}
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="h-auto w-full"
            />
            <div className="bg-[#04215e] p-4 text-white sm:p-8">
              <p className="font-heading text-2xl font-semibold leading-tight">
                “{institutionalContent.motto}”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <div
          className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12"
          data-motion-group
        >
          <div data-motion-item>
            <Landmark aria-hidden="true" className="h-8 w-8 text-[#b45309]" />
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-[#04215e] sm:text-4xl">
              Nuestra historia
            </h2>
            <div className="mt-5 grid gap-4 text-base leading-7 text-slate-600">
              {institutionalContent.history.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <article className="border-l-4 border-[#e7a928] bg-[#f3f6fb] p-4 sm:p-8" data-motion-item>
            <ShieldCheck aria-hidden="true" className="h-8 w-8 text-[#04215e]" />
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-[#04215e]">
              {institutionalContent.educationalSupport.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              {institutionalContent.educationalSupport.description}
            </p>
            <Link
              className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[#04215e] text-sm font-bold text-[#04215e]"
              href="/oferta-academica"
            >
              Revisar oferta y RVOE
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </article>
        </div>
      </section>

      <section className="bg-[#04215e] px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl" data-motion="rise">
            <p className="text-sm font-bold text-[#e7a928]">Identidad educativa</p>
            <h2 className="mt-2 font-heading text-[1.75rem] font-semibold leading-[1.04] sm:mt-3 sm:text-4xl sm:leading-[1.02] lg:text-5xl">
              Misión, visión y filosofía
            </h2>
          </div>
          <div
            className="mt-10 grid gap-px overflow-hidden border border-white/15 bg-white/15 lg:grid-cols-3"
            data-motion-group
          >
            <article className="bg-[#04215e] p-4 sm:p-8" data-motion-item>
              <h3 className="font-editorial text-2xl font-semibold">Misión</h3>
              <p className="mt-4 text-sm leading-7 text-white/78">
                {institutionalContent.mission}
              </p>
            </article>
            <article className="bg-[#04215e] p-4 sm:p-8" data-motion-item>
              <h3 className="font-editorial text-2xl font-semibold">Visión</h3>
              <div className="mt-4 grid gap-4 text-sm leading-7 text-white/78">
                {institutionalContent.vision.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
            <article className="bg-[#04215e] p-4 sm:p-8" data-motion-item>
              <h3 className="font-editorial text-2xl font-semibold">Filosofía</h3>
              <p className="mt-4 text-sm leading-7 text-white/78">
                {institutionalContent.philosophy}
              </p>
              <p className="mt-6 border-l-2 border-[#e7a928] pl-4 text-sm font-bold leading-6 text-white">
                “{institutionalContent.welcomeMotto}”
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl" data-motion="rise">
            <p className="text-sm font-bold text-[#b45309]">7 Reglas de Oro</p>
            <h2 className="mt-2 font-heading text-[1.75rem] font-semibold leading-[1.04] text-[#04215e] sm:mt-3 sm:text-4xl sm:leading-[1.02] lg:text-5xl">
              Valores que orientan a la comunidad
            </h2>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-motion-group>
            {institutionalContent.values.map((value, index) => (
              <li className="border border-slate-200 bg-white p-4 sm:p-6" data-motion-item key={value.title}>
                <span className="text-sm font-bold text-[#b45309]">
                  0{index + 1}
                </span>
                <h3 className="mt-3 font-editorial text-xl font-semibold leading-snug text-[#04215e]">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {value.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-10">
          <div className="mx-auto w-full max-w-sm border border-slate-200 bg-[#f8fafc] p-10" data-motion-media>
            <Image
              src="/logos/Logo Cuadrado/azul.png"
              alt="Escudo institucional de UNIVAMEX"
              width={800}
              height={800}
              className="h-auto w-full object-contain"
            />
          </div>
          <div data-motion="rise">
            <BookOpenCheck aria-hidden="true" className="h-8 w-8 text-[#b45309]" />
            <h2 className="mt-2 font-heading text-[1.75rem] font-semibold leading-[1.04] text-[#04215e] sm:mt-4 sm:text-4xl sm:leading-[1.02]">
              Lema y escudo
            </h2>
            <div className="mt-5 grid gap-3 sm:mt-7 sm:grid-cols-2 sm:gap-5" data-motion-group>
              {institutionalContent.emblem.map((item) => (
                <article className="border-t border-slate-300 pt-4" data-motion-item key={item.title}>
                  <h3 className="font-editorial text-xl font-semibold text-[#04215e]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f6fb] px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
        <div
          className="mx-auto flex max-w-7xl flex-col gap-7 border-l-4 border-[#e7a928] bg-white p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between"
          data-motion="rise"
        >
          <div>
            <h2 className="font-heading text-3xl font-semibold leading-tight text-[#04215e]">
              Conoce la oferta académica actual
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Compara programas por nivel y revisa modalidad, duración, RVOE,
              plan de estudios y campo laboral.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#04215e] px-6 text-sm font-bold text-white transition hover:bg-[#0b327f]"
              href="/oferta-academica"
            >
              Ver oferta académica
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <WhatsAppButton source="Quiénes somos" variant="accent" />
          </div>
        </div>
      </section>
    </SiteMotionShell>
  );
}
