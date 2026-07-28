"use client";

import { useState, type CSSProperties } from "react";
import { BookOpenText, Download, Layers3 } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import type { StudyBlock } from "@/types/content";

type StudyPlanProps = {
  items: StudyBlock[];
  pdfHref: string;
  programName: string;
};

type StudyPlanOverviewProps = {
  items: StudyBlock[];
};

const periodThemes = [
  { accent: "#f0bd4b", background: "#04215e", tint: "#f4f7fc" },
  { accent: "#a8c7ff", background: "#17478f", tint: "#f3f7ff" },
  { accent: "#82d4ca", background: "#0f5b6f", tint: "#f0faf9" },
  { accent: "#d4c1ff", background: "#51477f", tint: "#f8f5ff" },
  { accent: "#f2bf77", background: "#7a4d24", tint: "#fff8ef" },
  { accent: "#c9df85", background: "#53672c", tint: "#f8fbef" },
  { accent: "#9ecae5", background: "#264a68", tint: "#f3f9fc" },
  { accent: "#f2b8c6", background: "#714458", tint: "#fff5f7" },
] as const;

function getSubjectCount(items: StudyBlock[]) {
  return items.reduce((total, period) => total + period.items.length, 0);
}

export function StudyPlanOverview({ items }: StudyPlanOverviewProps) {
  return (
    <dl className="mt-4 grid grid-cols-2 gap-px border border-slate-200 bg-slate-200 sm:mt-8">
      <div className="bg-white p-3 transition-colors duration-300 hover:bg-[#eff6ff] sm:p-5">
        <dt className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-slate-500 sm:gap-2 sm:text-xs sm:tracking-[0.12em]">
          <Layers3 aria-hidden="true" className="h-4 w-4 text-[#1E40AF]" />
          Periodos
        </dt>
        <dd className="mt-1.5 font-editorial text-xl font-semibold leading-tight text-[#04215e] sm:mt-2 sm:text-2xl">
          {items.length} periodos
        </dd>
      </div>
      <div className="bg-white p-3 transition-colors duration-300 hover:bg-[#eff6ff] sm:p-5">
        <dt className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-slate-500 sm:gap-2 sm:text-xs sm:tracking-[0.12em]">
          <BookOpenText aria-hidden="true" className="h-4 w-4 text-[#1E40AF]" />
          Carga académica
        </dt>
        <dd className="mt-1.5 font-editorial text-xl font-semibold leading-tight text-[#04215e] sm:mt-2 sm:text-2xl">
          {getSubjectCount(items)} asignaturas
        </dd>
      </div>
    </dl>
  );
}

export function StudyPlan({ items, pdfHref, programName }: StudyPlanProps) {
  const [activePeriod, setActivePeriod] = useState(0);

  return (
    <div className="min-w-0">
      <section
        aria-label="Recorrido por periodos académicos"
        className="border-y border-[#04215e]/15 py-6 sm:py-8 lg:py-10"
        data-plan-stage
      >
        {items.map((period, periodIndex) => {
          const theme = periodThemes[periodIndex % periodThemes.length];
          const isActive = periodIndex === activePeriod;
          const themeProperties = {
            "--period-accent": theme.accent,
            "--period-background": theme.background,
            "--period-tint": theme.tint,
          } as CSSProperties;

          return (
            <article
              className={`mx-auto overflow-hidden border border-black/10 bg-white transition-[width,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                periodIndex === items.length - 1 ? "mb-0" : "mb-4 sm:mb-5"
              } ${
                isActive
                  ? "w-full opacity-100 shadow-xl shadow-slate-950/10"
                  : "w-[84%] opacity-100 shadow-none"
              }`}
              data-period-index={periodIndex}
              data-plan-period
              data-state={isActive ? "active" : "preview"}
              key={period.title}
              style={themeProperties}
            >
              <button
                aria-controls={`period-subjects-${periodIndex}`}
                aria-expanded={isActive}
                className="flex min-h-20 w-full items-center gap-3 bg-[var(--period-background)] px-4 py-4 text-left text-white transition-[filter] duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[var(--period-accent)] sm:min-h-24 sm:gap-6 sm:px-6"
                onClick={() => setActivePeriod(periodIndex)}
                type="button"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/30 text-[var(--period-accent)] sm:h-12 sm:w-12">
                  <BookOpenText aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-editorial text-xl font-semibold leading-tight sm:text-2xl">
                    {period.title}
                  </span>
                  <span className="mt-1 block text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white/65 sm:text-xs">
                    {period.items.length} asignaturas
                  </span>
                </span>
                <span className="hidden h-px flex-1 bg-white/20 md:block" />
                <span className="shrink-0 text-xs font-bold tracking-[0.12em] text-white/60">
                  {periodIndex + 1}/{items.length}
                </span>
              </button>

              <div
                aria-hidden={!isActive}
                className={isActive ? "block" : "hidden"}
                id={`period-subjects-${periodIndex}`}
              >
                <div className="border-t border-white/20 bg-[var(--period-tint)] p-3 sm:p-5">
                  <div className="grid grid-flow-dense grid-cols-2 border-l border-t border-slate-200 bg-white lg:grid-cols-3">
                    {period.items.map((subject) => (
                      <div
                        className="flex min-h-14 min-w-0 items-center border-b border-r border-slate-200 bg-white px-3 py-3 text-xs font-semibold leading-4 text-slate-800 transition-[background-color,color,padding] duration-300 hover:bg-[var(--period-tint)] hover:pl-4 hover:text-[var(--period-background)] sm:min-h-16 sm:px-4 sm:text-sm sm:leading-5"
                        key={`${period.title}-${subject}`}
                      >
                        {subject}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        <p className="sr-only" aria-live="polite">
          Periodo {activePeriod + 1} de {items.length}
        </p>
      </section>

      <div className="mt-4 flex flex-col gap-3 border border-slate-200 bg-white p-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <WhatsAppButton
          className="w-full sm:w-fit"
          label="Preguntar por el plan"
          program={programName}
          question="el plan de estudios, sus asignaturas y la organización de los periodos"
          source="Plan de estudios"
          variant="ghost"
        />
        <a
          aria-label={`Descargar plan de estudios de ${programName} en PDF`}
          className="group inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#1E3A8A] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#172E6E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] sm:w-fit"
          download
          href={pdfHref}
        >
          <Download
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
          />
          Descargar PDF
        </a>
      </div>
    </div>
  );
}
