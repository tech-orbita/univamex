"use client";

import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { areas, levels } from "@/data/site";
import { normalizeText } from "@/lib/utils";
import {
  programLevelQueryValues,
  programLevelRoutes,
} from "@/lib/program-levels";
import type { Program, ProgramArea, ProgramLevel } from "@/types/content";
import { ProgramCard } from "@/components/program-card";

type ProgramFinderProps = {
  programs: Program[];
  initialLevel?: ProgramLevel;
  syncLevelToUrl?: boolean;
  navigateOnLevelChange?: boolean;
};

type FilterValue = "Todos";

export function ProgramFinder({
  programs,
  initialLevel,
  syncLevelToUrl = false,
  navigateOnLevelChange = false,
}: ProgramFinderProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<ProgramLevel | FilterValue>(
    initialLevel ?? "Todos",
  );
  const [area, setArea] = useState<ProgramArea | FilterValue>("Todos");
  const [modality, setModality] = useState<string | FilterValue>("Todos");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const hasActiveFilters =
    query.trim().length > 0 ||
    level !== "Todos" ||
    area !== "Todos" ||
    modality !== "Todos";
  const selectedFilterCount = [level, area, modality].filter(
    (value) => value !== "Todos",
  ).length;

  const modalities = useMemo(
    () => Array.from(new Set(programs.map((program) => program.modality))),
    [programs],
  );

  const filteredPrograms = useMemo(() => {
    const normalizedQuery = normalizeText(query);

    return programs.filter((program) => {
      const matchesQuery =
        !normalizedQuery ||
        normalizeText(
          `${program.name} ${program.area} ${program.level} ${program.description}`,
        ).includes(normalizedQuery);
      const matchesLevel = level === "Todos" || program.level === level;
      const matchesArea = area === "Todos" || program.area === area;
      const matchesModality =
        modality === "Todos" || program.modality === modality;

      return matchesQuery && matchesLevel && matchesArea && matchesModality;
    });
  }, [area, level, modality, programs, query]);

  function handleLevelChange(value: ProgramLevel | FilterValue) {
    setLevel(value);

    if (navigateOnLevelChange) {
      router.push(
        value === "Todos" ? "/oferta-academica" : programLevelRoutes[value],
      );
      return;
    }

    if (!syncLevelToUrl) return;

    const params = new URLSearchParams(window.location.search);
    const pathname = window.location.pathname;

    if (value === "Todos") {
      params.delete("nivel");
    } else {
      params.set("nivel", programLevelQueryValues[value]);
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }

  function resetFilters() {
    setQuery("");
    setLevel(navigateOnLevelChange && initialLevel ? initialLevel : "Todos");
    setArea("Todos");
    setModality("Todos");
    setFiltersOpen(false);

    if (syncLevelToUrl) {
      const params = new URLSearchParams(window.location.search);
      const pathname = window.location.pathname;
      params.delete("nivel");
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    }
  }

  return (
    <section
      aria-label="Catálogo de programas"
      className="min-w-0 scroll-mt-36"
      id="catalogo"
    >
      <div className="sticky top-[4.25rem] z-30 -mx-4 border-y border-slate-200 bg-white/96 p-2 shadow-[0_12px_28px_-22px_rgba(4,33,94,0.55)] backdrop-blur-xl sm:top-20 sm:-mx-6 lg:mx-0 lg:border">
        <div className="relative flex min-w-0 items-center gap-2">
          <label className="flex min-h-11 min-w-0 flex-1 items-center gap-2 border border-slate-200 bg-slate-50 px-3 transition focus-within:border-[#1E40AF] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1E40AF]/15">
            <span className="sr-only">Buscar programa</span>
            <Search
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-slate-500 sm:h-5 sm:w-5"
            />
            <input
              aria-label="Buscar por carrera, área o nivel"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#0F172A] outline-none placeholder:font-normal placeholder:text-slate-500 sm:text-base"
              placeholder="Buscar programa"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <FilterSelect
              compact
              label="Nivel"
              value={level}
              options={["Todos", ...levels]}
              onChange={(value) =>
                handleLevelChange(value as ProgramLevel | FilterValue)
              }
            />
            <FilterSelect
              compact
              label="Área"
              value={area}
              options={["Todos", ...areas]}
              onChange={(value) => setArea(value as ProgramArea | FilterValue)}
            />
            <FilterSelect
              compact
              label="Modalidad"
              value={modality}
              options={["Todos", ...modalities]}
              onChange={setModality}
            />
          </div>

          <div className="shrink-0 lg:hidden">
            <button
              aria-expanded={filtersOpen}
              aria-controls="mobile-program-filters"
              className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 border border-slate-200 bg-white px-2.5 text-xs font-bold text-[#1E3A8A] transition hover:border-[#1E40AF] hover:bg-[#EFF6FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] sm:px-3 sm:text-sm"
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
            >
              <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
              <span className="hidden min-[360px]:inline">Filtros</span>
              {selectedFilterCount > 0 ? (
                <span className="inline-flex h-5 min-w-5 items-center justify-center bg-[#04215e] px-1 text-[0.6875rem] text-white">
                  {selectedFilterCount}
                </span>
              ) : null}
            </button>

          </div>

          <button
            aria-label="Reiniciar búsqueda y filtros"
            className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center border border-slate-200 bg-white text-[#1e3a8a] transition hover:border-[#1E40AF] hover:bg-[#EFF6FF] hover:text-[#04215e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] disabled:cursor-default disabled:opacity-30"
            disabled={!hasActiveFilters}
            title="Reiniciar búsqueda y filtros"
            type="button"
            onClick={resetFilters}
          >
            <RotateCcw aria-hidden="true" className="h-4 w-4" />
          </button>

          {filtersOpen ? (
            <div
              className="absolute right-0 top-[calc(100%+0.5rem)] z-40 grid w-[min(21rem,calc(100vw-2rem))] gap-2 border border-slate-200 bg-white p-3 shadow-2xl shadow-[#04215e]/15 lg:hidden"
              id="mobile-program-filters"
            >
              <FilterSelect
                label="Nivel"
                value={level}
                options={["Todos", ...levels]}
                onChange={(value) =>
                  handleLevelChange(value as ProgramLevel | FilterValue)
                }
              />
              <FilterSelect
                label="Área"
                value={area}
                options={["Todos", ...areas]}
                onChange={(value) =>
                  setArea(value as ProgramArea | FilterValue)
                }
              />
              <FilterSelect
                label="Modalidad"
                value={modality}
                options={["Todos", ...modalities]}
                onChange={setModality}
              />
            </div>
          ) : null}
        </div>
      </div>

      <p
        aria-live="polite"
        className="mt-3 text-xs font-semibold tabular-nums text-slate-500"
      >
        {filteredPrograms.length}{" "}
        {filteredPrograms.length === 1
          ? "programa encontrado"
          : "programas encontrados"}
      </p>

      <div className="mt-2 grid grid-flow-dense gap-4 sm:mt-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredPrograms.map((program) => (
          <ProgramCard key={program.slug} program={program} />
        ))}
        {filteredPrograms.length === 0 ? (
          <div className="border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:col-span-2 xl:col-span-3">
            <h3 className="font-editorial text-2xl font-semibold text-[#04215e]">
              No encontramos programas con esos filtros
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Prueba con otro nivel o área, o limpia los filtros para volver a
              ver toda la oferta.
            </p>
            <button
              className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-2 bg-[#04215e] px-4 text-sm font-bold text-white"
              type="button"
              onClick={resetFilters}
            >
              <RotateCcw aria-hidden="true" className="h-4 w-4" />
              Mostrar todos
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

type FilterSelectProps = {
  compact?: boolean;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function FilterSelect({
  compact = false,
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <label
      className={
        compact
          ? "flex h-11 w-44 min-w-0 items-center border border-slate-200 bg-white text-[#0F172A] transition focus-within:border-[#1E40AF] focus-within:ring-2 focus-within:ring-[#1E40AF]/15 xl:w-48"
          : "grid min-w-0 gap-1 text-xs font-bold text-slate-700"
      }
    >
      <span
        className={
          compact
            ? "shrink-0 border-r border-slate-200 px-2 text-[0.6875rem] font-bold uppercase tracking-[0.04em] text-slate-500"
            : "truncate"
        }
      >
        {label}
      </span>
      <select
        aria-label={`Filtrar por ${label.toLowerCase()}`}
        className={
          compact
            ? "h-full min-w-0 flex-1 cursor-pointer bg-white px-2 text-sm font-semibold text-[#0F172A] outline-none"
            : "min-h-11 min-w-0 cursor-pointer border border-slate-200 bg-white px-3 text-sm font-semibold text-[#0F172A] outline-none transition focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/15"
        }
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}



