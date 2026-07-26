"use client";

import { useMemo, useState } from "react";
import { BookOpenText, Download, Filter, Layers3 } from "lucide-react";
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

function getSubjectCount(items: StudyBlock[]) {
  return items.reduce((total, period) => total + period.items.length, 0);
}

export function StudyPlanOverview({ items }: StudyPlanOverviewProps) {
  return (
    <dl className="mt-6 grid grid-cols-2 gap-px border border-slate-200 bg-slate-200 sm:mt-8">
      <div className="bg-white p-4 sm:p-5">
        <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
          <Layers3 aria-hidden="true" className="h-4 w-4 text-[#1E40AF]" />
          Periodos
        </dt>
        <dd className="mt-2 font-editorial text-2xl font-semibold text-[#04215e]">
          {items.length} periodos
        </dd>
      </div>
      <div className="bg-white p-4 sm:p-5">
        <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
          <BookOpenText aria-hidden="true" className="h-4 w-4 text-[#1E40AF]" />
          Carga académica
        </dt>
        <dd className="mt-2 font-editorial text-2xl font-semibold text-[#04215e]">
          {getSubjectCount(items)} asignaturas
        </dd>
      </div>
    </dl>
  );
}

export function StudyPlan({ items, pdfHref, programName }: StudyPlanProps) {
  const [periodFilter, setPeriodFilter] = useState("Todos");

  const visiblePeriods = useMemo(
    () => items.filter((period) => periodFilter === "Todos" || period.title === periodFilter),
    [items, periodFilter],
  );

  return (
    <div className="min-w-0">
      <div className="border-y border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#b45309]">
              <Filter aria-hidden="true" className="h-4 w-4" />
              Explora por periodo
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Consulta todas las asignaturas de cada periodo en una sola vista, sin abrir elementos individuales.
            </p>
          </div>
          <p className="text-sm font-semibold text-[#04215e]" aria-live="polite">
            {visiblePeriods.length} {visiblePeriods.length === 1 ? "periodo" : "periodos"} visibles
          </p>
        </div>

        <label className="mt-5 grid max-w-md gap-1.5 text-sm font-bold text-[#04215e]">
          <span>Mostrar periodo</span>
          <select
            className="min-h-11 border border-slate-300 bg-white px-3 text-sm font-normal text-slate-700 outline-none transition focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/20"
            value={periodFilter}
            onChange={(event) => setPeriodFilter(event.target.value)}
          >
            <option>Todos</option>
            {items.map((period) => (
              <option key={period.title}>{period.title}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-x-auto border-x border-b border-slate-200 bg-white">
        <table className="min-w-[44rem] w-full border-collapse text-left">
          <caption className="sr-only">Plan de estudios de {programName}</caption>
          <thead className="bg-[#04215e] text-xs uppercase tracking-[0.1em] text-white">
            <tr>
              <th className="w-[24%] px-4 py-4 font-bold" scope="col">Periodo</th>
              <th className="px-4 py-4 font-bold" scope="col">Asignaturas</th>
            </tr>
          </thead>
          <tbody>
            {visiblePeriods.map((period) => (
              <tr className="border-b border-slate-200 align-top" key={period.title}>
                <th className="px-4 py-5 text-left sm:px-6 sm:py-6" scope="row">
                  <span className="block font-editorial text-xl font-semibold leading-tight text-[#04215e]">{period.title}</span>
                  <span className="mt-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-500">{period.items.length} asignaturas</span>
                </th>
                <td className="px-4 py-4 sm:px-6 sm:py-5">
                  <div className="grid grid-flow-dense border-l border-t border-slate-200 bg-white sm:grid-cols-2 xl:grid-cols-3">
                    {period.items.map((subject) => (
                      <div className="flex min-h-14 min-w-0 items-center border-b border-r border-slate-200 bg-white px-3 py-3 text-sm font-semibold leading-5 text-slate-800" key={`${period.title}-${subject}`}>
                        {subject}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-x border-b border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
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
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#1E3A8A] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#172E6E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] sm:w-fit"
          download
          href={pdfHref}
        >
          <Download aria-hidden="true" className="h-4 w-4" />
          Descargar PDF
        </a>
      </div>
    </div>
  );
}
