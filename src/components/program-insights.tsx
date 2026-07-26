"use client";

import { useState } from "react";
import { BrainCircuit, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { WhatsAppButton } from "@/components/whatsapp-button";

type InsightId = "ai" | "profile" | "career";

type ProgramInsightsProps = {
  programName: string;
  aiApplications: string[];
  aiLead: string;
  graduateProfile: string[];
  profileLead: string;
  careerField: string[];
  careerLead: string;
};

type InsightPanel = {
  id: InsightId;
  label: string;
  title: string;
  lead: string;
  items: string[];
  question: string;
  icon: typeof BrainCircuit;
};

export function ProgramInsights({
  programName,
  aiApplications,
  aiLead,
  graduateProfile,
  profileLead,
  careerField,
  careerLead,
}: ProgramInsightsProps) {
  const [activeId, setActiveId] = useState<InsightId>("ai");
  const panels: InsightPanel[] = [
    {
      id: "ai",
      label: "IA aplicada",
      title: "La tecnología como parte del oficio",
      lead: aiLead,
      items: aiApplications,
      question: "las aplicaciones de inteligencia artificial en esta carrera",
      icon: BrainCircuit,
    },
    {
      id: "profile",
      label: "Lo que desarrollarás",
      title: "Las capacidades que vas a construir",
      lead: profileLead,
      items: graduateProfile,
      question: "las habilidades y conocimientos del perfil de egreso",
      icon: GraduationCap,
    },
    {
      id: "career",
      label: "Campo laboral",
      title: "Dónde puede tomar forma tu trabajo",
      lead: careerLead,
      items: careerField,
      question: "los espacios profesionales relacionados con esta carrera",
      icon: BriefcaseBusiness,
    },
  ];
  const active = panels.find((panel) => panel.id === activeId) ?? panels[0];
  const ActiveIcon = active.icon;

  function movePanel(currentIndex: number, key: string) {
    let nextIndex = currentIndex;
    if (key === "ArrowRight") nextIndex = (currentIndex + 1) % panels.length;
    if (key === "ArrowLeft") nextIndex = (currentIndex - 1 + panels.length) % panels.length;
    if (key === "Home") nextIndex = 0;
    if (key === "End") nextIndex = panels.length - 1;
    if (nextIndex !== currentIndex) setActiveId(panels[nextIndex].id);
  }

  return (
    <div className="grid border border-[#cbd5e1] bg-white lg:grid-cols-[0.7fr_1.3fr]">
      <div className="bg-[#04215e] p-5 text-white sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f0bd4b]">Explora la carrera</p>
        <h2 className="mt-3 max-w-sm font-editorial text-3xl font-semibold leading-[1.05] sm:text-4xl">Una mirada rápida a tu futuro profesional.</h2>
        <div aria-label="Información profesional del programa" className="mt-8 grid gap-1" role="tablist">
          {panels.map((panel, index) => {
            const selected = panel.id === activeId;
            const Icon = panel.icon;

            return (
              <button
                aria-controls={`insight-panel-${panel.id}`}
                aria-selected={selected}
                className={`flex min-h-12 items-center gap-3 border-l-2 px-3 py-3 text-left text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#e7a928] ${selected ? "border-[#e7a928] bg-white/10 text-white" : "border-white/20 text-white/65 hover:border-white/70 hover:text-white"}`}
                id={`insight-tab-${panel.id}`}
                key={panel.id}
                role="tab"
                tabIndex={selected ? 0 : -1}
                type="button"
                onClick={() => setActiveId(panel.id)}
                onKeyDown={(event) => {
                  if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
                    event.preventDefault();
                    movePanel(index, event.key);
                  }
                }}
              >
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                {panel.label}
              </button>
            );
          })}
        </div>
      </div>

      <section
        aria-labelledby={`insight-tab-${active.id}`}
        className="p-5 sm:p-7"
        id={`insight-panel-${active.id}`}
        role="tabpanel"
        tabIndex={0}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b45309]">{active.label}</p>
            <h3 className="mt-2 max-w-xl font-editorial text-3xl font-semibold leading-[1.05] text-[#04215e] sm:text-4xl">{active.title}</h3>
          </div>
          <ActiveIcon aria-hidden="true" className="hidden h-8 w-8 shrink-0 text-[#1e40af] sm:block" />
        </div>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{active.lead}</p>
        <div className="mt-6 grid border-y border-slate-200 sm:grid-cols-2">
          {active.items.map((item) => (
            <p className="border-b border-slate-200 px-4 py-3 text-sm font-semibold leading-6 text-slate-800 last:border-b-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0" key={item}>
              {item}
            </p>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 border-l-2 border-[#e7a928] pl-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-6 text-slate-600">¿Quieres hablar de este enfoque aplicado a {programName}?</p>
          <WhatsAppButton
            className="w-full shrink-0 sm:w-fit"
            label="Hablar con admisiones"
            program={programName}
            question={active.question}
            source="Explorador profesional"
            variant="ghost"
          />
        </div>
      </section>
    </div>
  );
}
