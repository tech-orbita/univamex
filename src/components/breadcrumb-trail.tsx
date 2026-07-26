import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  href?: string;
  label: string;
};

type BreadcrumbTrailProps = {
  backHref: string;
  backLabel?: string;
  compact?: boolean;
  items: BreadcrumbItem[];
};

export function BreadcrumbTrail({
  backHref,
  backLabel = "Ir atrás",
  compact = false,
  items,
}: BreadcrumbTrailProps) {
  return (
    <div className={compact ? "flex min-w-0 items-center gap-2" : "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"}>
      <Link
        aria-label={compact ? backLabel : undefined}
        className={compact
          ? "inline-grid h-11 w-8 shrink-0 place-items-center text-[#1E3A8A] transition-colors hover:text-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
          : "inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-[#1E3A8A] transition-colors hover:text-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"}
        href={backHref}
      >
        <ArrowLeft aria-hidden="true" className="h-4 w-4" />
        {compact ? null : backLabel}
      </Link>

      <nav aria-label="Ruta de navegación" className={compact ? "min-w-0 flex-1 overflow-hidden" : undefined}>
        <ol className={compact ? "flex flex-nowrap items-center gap-0.5 whitespace-nowrap text-[0.7rem] text-slate-600 sm:gap-1 sm:text-sm" : "flex flex-wrap items-center gap-x-1 gap-y-2 text-sm text-slate-600"}>
          {items.map((item, index) => {
            const isCurrent = index === items.length - 1;

            return (
              <li className="flex min-w-0 items-center gap-1" key={`${item.label}-${index}`}>
                {index > 0 ? (
                  <ChevronRight
                    aria-hidden="true"
                    className={compact ? "h-3 w-3 shrink-0 text-slate-400 sm:h-4 sm:w-4" : "h-4 w-4 shrink-0 text-slate-400"}
                  />
                ) : null}
                {item.href && !isCurrent ? (
                  <Link
                    className="font-medium text-[#1E3A8A] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isCurrent ? "page" : undefined}
                    className={isCurrent ? "font-semibold text-slate-800" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
