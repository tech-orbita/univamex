import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { faqItems } from "@/data/faq";

export function HomeFaqPreview() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
        <div data-motion="rise">
          <p className="text-sm font-bold text-[#b45309]">Preguntas frecuentes</p>
          <h2 className="mt-2 font-heading text-[1.75rem] font-semibold leading-[1.04] text-[#04215e] sm:mt-3 sm:text-4xl sm:leading-[1.02] lg:text-5xl">
            Resuelve lo esencial antes de avanzar
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
            Consulta respuestas breves y abre la página completa cuando necesites más contexto.
          </p>
          <Link
            className="mt-5 inline-flex min-h-11 items-center gap-2 border border-[#04215e] px-4 text-sm font-bold text-[#04215e] transition hover:bg-[#04215e] hover:text-white sm:mt-7 sm:min-h-12 sm:px-5"
            href="/faq"
          >
            Ver todas las preguntas
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div
          className="divide-y divide-slate-200 border-y border-slate-200"
          data-motion-group
        >
          {faqItems.slice(0, 4).map((item, index) => (
            <details
              className="group py-3.5 sm:py-5"
              data-motion-item
              key={item.question}
              open={index === 0}
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-editorial text-lg font-semibold leading-snug text-[#04215e] marker:hidden sm:gap-4 sm:text-xl">
                <span>{item.question}</span>
                <Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-[#b45309] transition-transform group-open:rotate-45" />
              </summary>
              <p className="max-w-2xl pb-1 pr-7 pt-2 text-sm leading-5 text-slate-600 sm:pb-2 sm:pr-8 sm:pt-3 sm:leading-7">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
