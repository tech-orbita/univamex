import type { CSSProperties } from "react";
import { CheckCircle2 } from "lucide-react";
import { admissionsByLevel } from "@/data/admissions";
import type { ProgramLevel } from "@/types/content";

type DocumentGridStyle = CSSProperties & {
  "--document-columns": number;
};

type AdmissionsChecklistProps = {
  level?: ProgramLevel;
  variant?: "default" | "program";
};

export function AdmissionsChecklist({
  level,
  variant = "default",
}: AdmissionsChecklistProps) {
  const requirements = level
    ? admissionsByLevel.filter((item) => item.level === level)
    : admissionsByLevel;

  if (variant === "program") {
    return (
      <div className="divide-y divide-[#04215e]/20 border-y border-[#04215e]/20 bg-white/65 backdrop-blur-sm">
        {requirements.map((requirement) => (
          <article
            className="grid grid-cols-1 lg:grid-cols-[15rem_1fr]"
            key={requirement.level}
          >
            <div className="flex items-center border-b border-[#04215e]/15 px-4 py-5 sm:px-6 lg:border-b-0 lg:border-r lg:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#b45309]">
                  Documentación
                </p>
                <h3 className="mt-1 font-editorial text-2xl font-semibold leading-tight text-[#04215e]">
                  {requirement.level}
                </h3>
              </div>
            </div>
            <ul
              className="grid grid-cols-1 gap-px bg-[#04215e]/10 sm:grid-cols-2 lg:grid-cols-[repeat(var(--document-columns),minmax(0,1fr))]"
              style={
                {
                  "--document-columns": requirement.documents.length,
                } as DocumentGridStyle
              }
            >
              {requirement.documents.map((document) => (
                <li
                  className="group flex min-h-20 min-w-0 items-center gap-3 bg-white/75 px-4 py-4 text-sm font-semibold leading-5 text-slate-700 transition-colors hover:bg-white lg:px-3 xl:px-4"
                  key={document}
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-[#1e40af] transition-transform duration-300 group-hover:scale-110"
                  />
                  <span>{document}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
      {requirements.map((requirement) => (
        <article
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 sm:p-5"
          key={requirement.level}
        >
          <h3 className="font-editorial text-xl font-semibold leading-snug text-[#04215e]">
            {requirement.level}
          </h3>
          <ul className="mt-3 grid gap-2 sm:mt-4 sm:gap-3">
            {requirement.documents.map((document) => (
              <li className="flex gap-3 text-sm text-slate-700" key={document}>
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]"
                />
                <span>{document}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}



