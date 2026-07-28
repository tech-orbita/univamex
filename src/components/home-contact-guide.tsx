import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { GuidedWhatsAppForm } from "@/components/guided-whatsapp-form";
import { campuses } from "@/data/campuses";
import { programs } from "@/data/programs";
import { siteConfig } from "@/data/site";

export function HomeContactGuide() {
  return (
    <section className="bg-[#04215e] px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-10 lg:py-20" id="solicitar-informes">
      <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-10">
        <div className="lg:sticky lg:top-28" data-motion="rise">
          <p className="text-sm font-bold text-[#e7a928]">Solicita orientación</p>
          <h2 className="mt-2 max-w-xl font-heading text-[1.75rem] font-semibold leading-[1.04] sm:mt-3 sm:text-4xl sm:leading-[1.02] lg:text-5xl">
            Llega a admisiones con tu interés claro
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:mt-5 sm:text-lg sm:leading-7">
            Completa tres datos y prepararemos un mensaje para que el equipo pueda orientarte sobre requisitos, modalidad, horarios y fechas de inicio.
          </p>
          <div className="mt-4 flex gap-3 border-l-2 border-[#e7a928] pl-3 text-sm leading-5 text-white/75 sm:mt-7 sm:pl-4 sm:leading-6">
            <Clock3 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#e7a928]" />
            <p>Horario de atención: {siteConfig.serviceHours}.</p>
          </div>
          <Link
            className="mt-4 inline-flex min-h-11 items-center gap-2 border-b border-white/40 text-sm font-bold text-white sm:mt-7"
            href="/contacto"
          >
            Ver todos los canales de contacto
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div data-motion-media>
          <GuidedWhatsAppForm
            programs={programs.map(({ name, level }) => ({ name, level }))}
            campuses={campuses.map(({ name }) => name)}
            source="Home"
          />
        </div>
      </div>
    </section>
  );
}
